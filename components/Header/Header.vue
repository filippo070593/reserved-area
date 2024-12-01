<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "~/composables/useAuth";
import { useRouteChecker } from "~/composables/useRouteChecker";

const { checkAndNavigate } = useRouteChecker();
const { logout, status, checkAuth } = useAuth();

const drawer = ref(false);

const menuItems = ref([{ title: "Home", icon: "mdi-home", link: "index" }]);

const goToLogin = () => {
  checkAndNavigate("login");
};

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const navigationDriver = (routeName: string) => {
  checkAndNavigate(routeName);
};

onMounted(() => {
  checkAuth();
});
</script>

<template>
  <!-- Barra superiore -->
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-toolbar-title>La mia App</v-toolbar-title>
    <v-spacer />
    <!-- Icona utente -->
    <v-btn icon @click="status.isLogged ? logout() : goToLogin()">
      <v-icon>{{ status.isLogged ? "mdi-logout" : "mdi-account" }}</v-icon>
    </v-btn>
    <!-- Icona impostazioni -->
    <v-btn icon>
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Menu laterale (Drawer) -->
  <v-navigation-drawer v-model="drawer" temporary app>
    <v-list>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        @click="navigationDriver(item.link)"
        link
      >
        <div class="d-flex align-items-center ga-3">
          <v-icon>{{ item.icon }}</v-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </div>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
h1 {
  color: #1976d2;
  text-align: center;
}

.v-list-item__content {
  display: flex;
  align-items: center;
}
</style>
