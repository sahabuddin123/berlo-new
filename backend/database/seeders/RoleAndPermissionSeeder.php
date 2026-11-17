<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Define Roles
        $roles = [
            'superadmin' => [
                'display_name' => 'Super Administrator',
                'description' => 'Unrestricted master access to all system modules, settings, users, and data.',
            ],
            'admin' => [
                'display_name' => 'Administrator',
                'description' => 'Operational administrative control over all content, leads, and staff operations.',
            ],
            'moderator' => [
                'display_name' => 'Moderator',
                'description' => 'Reviews and moderates inquiries, drafts, client reviews, and media updates.',
            ],
            'content_writer' => [
                'display_name' => 'Content Writer',
                'description' => 'Creates and manages drafts for case studies, articles, and gallery updates.',
            ],
        ];

        $roleModels = [];
        foreach ($roles as $name => $meta) {
            $roleModels[$name] = Role::updateOrCreate(['name' => $name], $meta);
        }

        // 2. Define Granular Permissions
        $permissions = [
            // User & Roles
            ['name' => 'users.view', 'display_name' => 'View Users', 'module' => 'users'],
            ['name' => 'users.create', 'display_name' => 'Create Users', 'module' => 'users'],
            ['name' => 'users.edit', 'display_name' => 'Edit Users', 'module' => 'users'],
            ['name' => 'users.delete', 'display_name' => 'Delete Users', 'module' => 'users'],

            // Settings
            ['name' => 'settings.manage', 'display_name' => 'Manage Settings', 'module' => 'settings'],

            // Services
            ['name' => 'services.view', 'display_name' => 'View Services', 'module' => 'services'],
            ['name' => 'services.create', 'display_name' => 'Create Services', 'module' => 'services'],
            ['name' => 'services.edit', 'display_name' => 'Edit Services', 'module' => 'services'],
            ['name' => 'services.delete', 'display_name' => 'Delete Services', 'module' => 'services'],

            // Projects / Work
            ['name' => 'projects.view', 'display_name' => 'View Projects', 'module' => 'projects'],
            ['name' => 'projects.create', 'display_name' => 'Create Projects', 'module' => 'projects'],
            ['name' => 'projects.edit', 'display_name' => 'Edit Projects', 'module' => 'projects'],
            ['name' => 'projects.delete', 'display_name' => 'Delete Projects', 'module' => 'projects'],

            // Insights / Articles
            ['name' => 'insights.view', 'display_name' => 'View Insights', 'module' => 'insights'],
            ['name' => 'insights.create', 'display_name' => 'Create Insights', 'module' => 'insights'],
            ['name' => 'insights.edit', 'display_name' => 'Edit Insights', 'module' => 'insights'],
            ['name' => 'insights.delete', 'display_name' => 'Delete Insights', 'module' => 'insights'],
            ['name' => 'insights.publish', 'display_name' => 'Publish Insights', 'module' => 'insights'],

            // Gallery
            ['name' => 'gallery.manage', 'display_name' => 'Manage Gallery', 'module' => 'gallery'],

            // Inquiries & Leads
            ['name' => 'inquiries.view', 'display_name' => 'View Inquiries', 'module' => 'inquiries'],
            ['name' => 'inquiries.edit', 'display_name' => 'Process Inquiries', 'module' => 'inquiries'],
            ['name' => 'inquiries.delete', 'display_name' => 'Delete Inquiries', 'module' => 'inquiries'],

            // Audit Logs
            ['name' => 'logs.view', 'display_name' => 'View Activity Logs', 'module' => 'logs'],
        ];

        $allPermissionIds = [];
        foreach ($permissions as $perm) {
            $p = Permission::updateOrCreate(['name' => $perm['name']], $perm);
            $allPermissionIds[$perm['name']] = $p->id;
        }

        // 3. Assign Permissions to Roles
        // Superadmin gets ALL permissions
        $roleModels['superadmin']->permissions()->sync(array_values($allPermissionIds));

        // Admin gets content, inquiries, settings, and logs
        $adminPerms = array_filter($allPermissionIds, fn ($k) => !str_starts_with($k, 'users.'), ARRAY_FILTER_USE_KEY);
        $roleModels['admin']->permissions()->sync(array_values($adminPerms));

        // Moderator gets inquiries review, insights publish, gallery manage, logs
        $modPerms = array_filter(
            $allPermissionIds,
            fn ($k) => in_array($k, [
                'services.view', 'projects.view', 'insights.view', 'insights.publish',
                'gallery.manage', 'inquiries.view', 'inquiries.edit',
            ]),
            ARRAY_FILTER_USE_KEY
        );
        $roleModels['moderator']->permissions()->sync(array_values($modPerms));

        // Content Writer gets create/edit on services, projects, insights, gallery
        $writerPerms = array_filter(
            $allPermissionIds,
            fn ($k) => in_array($k, [
                'services.view', 'services.create', 'services.edit',
                'projects.view', 'projects.create', 'projects.edit',
                'insights.view', 'insights.create', 'insights.edit',
                'gallery.manage',
            ]),
            ARRAY_FILTER_USE_KEY
        );
        $roleModels['content_writer']->permissions()->sync(array_values($writerPerms));

        // 4. Create Default Role Users
        $defaultUsers = [
            [
                'name' => 'Sahab Uddin (Superadmin)',
                'email' => 'superadmin@berlocommunications.com',
                'password' => Hash::make('Berlo@Admin2026!'),
                'role' => 'superadmin',
            ],
            [
                'name' => 'Berlo Operations Admin',
                'email' => 'admin@berlocommunications.com',
                'password' => Hash::make('Berlo@Admin2026!'),
                'role' => 'admin',
            ],
            [
                'name' => 'Editorial Moderator',
                'email' => 'moderator@berlocommunications.com',
                'password' => Hash::make('Berlo@Admin2026!'),
                'role' => 'moderator',
            ],
            [
                'name' => 'Staff Content Writer',
                'email' => 'writer@berlocommunications.com',
                'password' => Hash::make('Berlo@Admin2026!'),
                'role' => 'content_writer',
            ],
        ];

        foreach ($defaultUsers as $u) {
            $user = User::updateOrCreate(
                ['email' => $u['email']],
                [
                    'name' => $u['name'],
                    'password' => $u['password'],
                    'email_verified_at' => now(),
                ]
            );

            $user->roles()->sync([$roleModels[$u['role']]->id]);
        }
    }
}
