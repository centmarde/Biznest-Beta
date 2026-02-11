<script setup lang="ts">
import OuterLayout from '@/layout/OuterLayout.vue';
import AdminSidebar from './AdminSidebar.vue';
import AdminHeader from './AdminHeader.vue';
import { RouterView } from 'vue-router';
import './admin-dashboard/admin.css';
</script>

<template>
    <OuterLayout>
        <template #content>
            <div class="admin-layout">
                <!-- Sidebar -->
                <AdminSidebar />

                <!-- Main Content Wrapper -->
                <div class="admin-content-wrapper">
                    <!-- Header -->
                    <AdminHeader />

                    <!-- Main Content - Router View for nested routes -->
                    <main class="admin-main">
                        <RouterView />
                    </main>
                </div>
            </div>
        </template>
    </OuterLayout>
</template>
