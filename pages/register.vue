<script setup lang="ts">
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

function register() {
  const newUser = $fetch("/api/user/post", {
    method: "POST",
    body: {
      email: email.value,
      password: password.value,
    },
  })
    .then((res) => {
      alert(res.message);
    })
    .catch((e) => {
      alert(e);
    });
}
</script>
<template>
  <div
    id="bg"
    class="w-screen h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex justify-center items-center p-4"
  >
    <div id="center" class="w-full max-w-md">
      <div class="bg-gray-700 shadow-lg rounded-lg overflow-hidden">
        <div
          class="text-white bg-gray-800 flex justify-center items-center py-4 border-b border-gray-600 uppercase text-lg font-semibold tracking-wider"
        >
          <div>Register</div>
        </div>
        <div class="p-6 space-y-6">
          <div class="space-y-4">
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  v-model="email"
                  class="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-300 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  v-model="password"
                  class="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label
                  for="confirmPassword"
                  class="block text-sm font-medium text-gray-300 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  v-model="confirmPassword"
                  class="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              @click="register()"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 font-semibold transition duration-150 ease-in-out"
            >
              <span>Register</span>
            </button>
          </div>

          <div class="flex justify-between items-center text-sm">
            <button
              class="cursor-pointer text-blue-400 hover:text-blue-300 hover:underline focus:outline-none"
              @click="navigateTo('/login')"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
