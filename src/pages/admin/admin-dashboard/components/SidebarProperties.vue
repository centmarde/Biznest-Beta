<script setup lang="ts">
import OuterLayout from '@/layout/OuterLayout.vue';
import AdminSidebar from '@/pages/admin/AdminSidebar.vue'
import AdminHeader from '@/pages/admin/AdminHeader.vue'
import { TypographyH1, TypographyP } from '@/components/ui/typography'
import '../admin.css'

// You can add page-specific logic here
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

                <!-- Main Content -->
                <main class="admin-main">
                    <TypographyH1 class="admin-dashboard-title">Properties</TypographyH1>
                    <TypographyP class="admin-dashboard-subtitle">View detailed properties and reports.</TypographyP>

                    <!-- Add your properties-specific content here -->
                    <div class="admin-table-section">
                    <TypographyP>Properties content goes here...</TypographyP>
                    </div>
                </main>
                </div>
            </div>
        </template>
    </OuterLayout>
</template>