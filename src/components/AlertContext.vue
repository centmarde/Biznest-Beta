<script lang="ts">
import { inject, type InjectionKey } from "vue";

export interface AlertData {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
  duration?: number;
}

export type AlertContextType = {
  addAlert: (alert: Omit<AlertData, "id">) => void;
  removeAlert: (id: string) => void;
};

export const AlertContextKey = Symbol(
  "AlertContext",
) as InjectionKey<AlertContextType>;

export function useAlert() {
  const context = inject(AlertContextKey);
  if (!context) {
    throw new Error("useAlert must be used within an AlertContext");
  }
  return context;
}
</script>

<script setup lang="ts">
import { ref, provide } from "vue";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { X, AlertCircle, CheckCircle2, Info } from "lucide-vue-next";

const alerts = ref<AlertData[]>([]);

const addAlert = (alert: Omit<AlertData, "id">) => {
  const id = Math.random().toString(36).substring(2, 9);
  const newAlert: AlertData = {
    ...alert,
    id,
    duration: alert.duration ?? 5000,
  };

  alerts.value.push(newAlert);

  if (newAlert.duration && newAlert.duration > 0) {
    setTimeout(() => {
      removeAlert(id);
    }, newAlert.duration);
  }
};

const removeAlert = (id: string) => {
  alerts.value = alerts.value.filter((a) => a.id !== id);
};

provide(AlertContextKey, {
  addAlert,
  removeAlert,
});
</script>

<template>
  <slot />

  <Teleport to="body">
    <div
      class="fixed top-20 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none"
    >
      <TransitionGroup name="alert-slide">
        <div
          v-for="alert in alerts"
          :key="alert.id"
          class="pointer-events-auto w-full transition-all duration-300 ease-in-out"
        >
          <Alert
            :variant="alert.variant"
            class="relative shadow-lg bg-nav-background border"
          >
            <component
              :is="
                alert.variant === 'destructive'
                  ? AlertCircle
                  : alert.variant === 'success'
                    ? CheckCircle2
                    : Info
              "
              class="h-4 w-4"
            />
            <AlertTitle class="mb-1 font-semibold pr-6">
              {{ alert.title }}
            </AlertTitle>
            <AlertDescription v-if="alert.description">
              {{ alert.description }}
            </AlertDescription>
            <button
              @click="removeAlert(alert.id)"
              class="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X class="h-4 w-4" />
              <span class="sr-only">Close</span>
            </button>
            <div
              v-if="alert.duration && alert.duration > 0"
              class="absolute bottom-0 left-0 h-1 w-full bg-muted overflow-hidden rounded-b-lg"
            >
              <div
                class="h-full progress-bar"
                :class="[
                  alert.variant === 'destructive'
                    ? 'bg-destructive'
                    : alert.variant === 'success'
                      ? 'bg-success'
                      : 'bg-primary',
                ]"
                :style="{ animationDuration: `${alert.duration}ms` }"
              ></div>
            </div>
          </Alert>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.progress-bar {
  animation-name: progress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

.alert-slide-enter-active,
.alert-slide-leave-active {
  transition: all 0.3s ease;
}

.alert-slide-enter-from,
.alert-slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.alert-slide-leave-active {
  position: absolute;
  /* This ensures smooth removal animation in a list, 
     but might stack weirdly if not handled. 
     Usually TransitionGroup handles it better without absolute if it's a flex col.
     Let's check if absolute is needed for 'move' transition.
     Actually, for a simple slide out, simple opacity/translate is enough.
  */
}

/* Optional: animating the rest of the items when one is removed */
.alert-slide-move {
  transition: transform 0.3s ease;
}
</style>
