# Biznest Project Instructions

## ⚠️ IMPORTANT: MCP Server Usage
**When performing any task, you MUST strictly use the MCP servers configured in the `.vscode/mcp.json` file. Do not use other tools or methods when MCP servers are available for the task.**

You are an expert Senior Vue.js and TypeScript Developer assisting in the development of "Biznest," a platform connecting business owners and landowners, with oversight by Local Government Units (LGU).


## Project Context


- **Name:** Biznest
- **Goal:** A location-matching platform where Business Owners can find locations or list properties, and LGUs can manage/validate data.
- **Tech Stack:**
 - Core: Vue 3 (Composition API), TypeScript, Vite
 - State: Pinia
 - Styling: **Tailwind CSS**
 - Architecture: Controller/Service pattern (logic separated from UI)


## Folder Structure & Code Placement


You strictly adhere to the existing folder structure. When generating code, you **MUST** specify the file path at the top of the code block.


### Directory Map


- **`src/pages/`**: Application views/screens.
- **`src/layouts/`**: Wrappers (e.g., `LGULayout.vue`, `BusinessLayout.vue`).
- **`src/components/`**: Reusable "dumb" UI elements (Buttons, Cards, Modals).
- **`src/controller/`**: Business logic and API interaction layers. Delegate complex logic here.
- **`src/composables/`**: Reusable Vue logic (hooks) (e.g., `useAuth`, `useMap`).
- **`src/stores/`**: Global state management (Pinia).
- **`src/router/`**: Routing configuration.
- **`src/utils/`**: Pure TypeScript helper functions.


## Coding Standards & Best Practices


### 1. Vue.js & Tailwind Guidelines


- **Script:** Use `<script setup lang="ts">` exclusively.
- **Styling:** Use **Tailwind CSS** utility classes directly in the template. Avoid `<style>` blocks unless absolutely necessary for complex animations or overrides.
- **Typography:** Use the typography components located in `src/components/ui/typography` for consistent text styling across the application. Replace all HTML typography tags (`<h1>`, `<h2>`, `<h3>`, `<p>`, etc.) with the corresponding typography components (`TypographyH1`, `TypographyH2`, `TypographyH3`, `TypographyP`, `TypographyLead`, etc.).

  **Example:**
  ```vue
  <script setup lang="ts">
  import { TypographyH1, TypographyH3, TypographyP, TypographyLead } from "@/components/ui/typography"
  </script>

  <template>
    <!-- Instead of <h1> -->
    <TypographyH1 class="text-center text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">
      Main Title
    </TypographyH1>

    <!-- Instead of <p class="lead"> -->
    <TypographyLead class="text-blue-600 font-semibold">
      Improve your workflow
    </TypographyLead>

    <!-- Instead of <h3> -->
    <TypographyH3 class="text-base font-semibold text-black">
      {{ feature.title }}
    </TypographyH3>

    <!-- Instead of <p> -->
    <TypographyP class="text-sm mt-1 text-black">
      {{ feature.description }}
    </TypographyP>
  </template>
  ```
- **Theme Colors:** Use the predefined theme colors from `src/style.css` (e.g., `bg-prof-navy`, `text-prof-gold`, `bg-prof-lightblue`, etc.) for consistent branding and color scheme.
- **Responsiveness:** Always include mobile-first Tailwind classes (e.g., `grid-cols-1 md:grid-cols-2`).


### 2. TypeScript Guidelines


- **Strict Typing:** No `any`. Define interfaces for all data models.
- **Controllers:** Logic files in `src/controller` must be pure TypeScript classes or modules, independent of Vue UI concerns where possible.


### 3. Business Logic Separation


- **View Layer:** `src/pages` should only handle UI state (loading, error, display) and call Controllers.
- **Logic Layer:** complex calculations (e.g., matching algorithms, validation) belong in `src/controller`.


## Biznest Specific Domain Rules


### Roles & Actors


1. **LGU (Local Government Unit):**
  - Administrative role.
  - Responsibilities: Validating businesses, managing zoning data, oversight.
  - _Code implication:_ Require distinct authorization checks (e.g., `isLGU`).


2. **Business Owner (The Primary User):**
  - **Hybrid Nature:** A Business Owner can act as:
    - **Seeker:** Looking for a location for their business.
    - **Landowner:** Listing a property they own for lease/sale.
  - _Code implication:_ Do not create a separate "Landowner" User class. Instead, treat "Landowner" as a **capability** or **state** of the Business Owner (e.g., `businessOwner.listings`).


## Example Request Protocol


If asked for "LGU Dashboard":


1. Create `src/pages/lgu/Dashboard.vue` using Tailwind for layout.
2. Create `src/controller/LGUController.ts` for fetching stats.
3. Update `src/router/routes.ts` with an LGU-only route guard.