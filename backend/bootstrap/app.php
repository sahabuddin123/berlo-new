<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use App\Http\Middleware\SecurityHeaders;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Global Enterprise Security Headers
        $middleware->append(SecurityHeaders::class);

        // Stateful API routes for Sanctum (cookie-based SPA auth)
        $middleware->statefulApi();

        // Exempt API routes from CSRF verification
        $middleware->validateCsrfTokens(except: ['api/*']);

        // Custom RBAC Middleware Aliases
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
            'permission' => \App\Http\Middleware\PermissionMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );

        // Secure Production Error Masking (Prevent Database/Stack-trace Information Disclosure)
        $exceptions->render(function (\Throwable $e, Request $request) {
            if (($request->is('api/*') || $request->expectsJson()) && !config('app.debug')) {
                if ($e instanceof \Illuminate\Validation\ValidationException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'The given data was invalid.',
                        'errors' => $e->errors(),
                    ], 422);
                }

                if ($e instanceof \Illuminate\Auth\AuthenticationException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Unauthenticated or session expired.',
                    ], 401);
                }

                if ($e instanceof \Illuminate\Auth\Access\AuthorizationException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Unauthorized action.',
                    ], 403);
                }

                if ($e instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Requested resource not found.',
                    ], 404);
                }

                if ($e instanceof \Symfony\Component\HttpKernel\Exception\HttpExceptionInterface) {
                    return response()->json([
                        'success' => false,
                        'message' => $e->getMessage() ?: 'Request failed.',
                    ], $e->getStatusCode());
                }

                // Log full internal error privately in storage/logs/laravel.log
                \Illuminate\Support\Facades\Log::error('API Error: ' . $e->getMessage(), [
                    'exception' => $e,
                    'url' => $request->fullUrl(),
                    'ip' => $request->ip(),
                ]);

                // Return safe message without leaking internal paths or SQL details
                return response()->json([
                    'success' => false,
                    'message' => 'An internal server error occurred. Please try again or contact support.',
                ], 500);
            }
        });
    })->create();
