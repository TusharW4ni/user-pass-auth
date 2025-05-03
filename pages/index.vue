<script setup lang="ts">
import { ref } from "vue";

const mode = ref("login"); // options: login, register, forgotPassword
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const resetCode = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");

function submit(mode: string) {
  if (mode === "login") {
    console.log("Login submitted", {
      email: email.value,
      password: password.value,
    });
  } else if (mode === "register") {
    console.log("Register submitted", {
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });
  } else if (mode === "forgotPassword") {
    console.log("Reset Password submitted", {
      resetCode: resetCode.value,
      newPassword: newPassword.value,
      confirmNewPassword: confirmNewPassword.value,
    });
  }
}

function changeMode(newMode: string) {
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  resetCode.value = "";
  newPassword.value = "";
  confirmNewPassword.value = "";
  mode.value = newMode;
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
          <div v-if="mode === 'login'">Login</div>
          <div v-if="mode === 'register'">Register</div>
          <div v-if="mode === 'forgotPassword'">Reset Password</div>
        </div>
        <div class="p-6 space-y-6">
          <div class="space-y-4">
            <div
              v-if="mode !== 'forgotPassword'"
              class="grid grid-cols-1 gap-4"
            >
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

            <div
              v-if="mode !== 'forgotPassword'"
              class="grid grid-cols-1 gap-4"
            >
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

            <div v-if="mode === 'register'" class="grid grid-cols-1 gap-4">
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

            <div
              v-if="mode === 'forgotPassword'"
              class="grid grid-cols-1 gap-4"
            >
              <div>
                <label
                  for="resetCode"
                  class="block text-sm font-medium text-gray-300 mb-1"
                >
                  Reset Code
                </label>
                <input
                  id="resetCode"
                  type="password"
                  v-model="resetCode"
                  class="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Enter reset code from email"
                />
              </div>
            </div>

            <div
              v-if="mode === 'forgotPassword'"
              class="grid grid-cols-1 gap-4"
            >
              <div>
                <label
                  for="newPassword"
                  class="block text-sm font-medium text-gray-300 mb-1"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  v-model="newPassword"
                  class="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div
              v-if="mode === 'forgotPassword'"
              class="grid grid-cols-1 gap-4"
            >
              <div>
                <label
                  for="confirmNewPassword"
                  class="block text-sm font-medium text-gray-300 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmNewPassword"
                  type="password"
                  v-model="confirmNewPassword"
                  class="w-full bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              @click="submit(mode)"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 font-semibold transition duration-150 ease-in-out"
            >
              <span v-if="mode === 'login'">Login</span>
              <span v-if="mode === 'register'">Register</span>
              <span v-if="mode === 'forgotPassword'">Reset Password</span>
            </button>
          </div>

          <div class="flex justify-between items-center text-sm">
            <button
              class="text-blue-400 hover:text-blue-300 hover:underline focus:outline-none"
              @click="changeMode('login')"
              v-if="mode !== 'login'"
            >
              Back to Login
            </button>
            <button
              class="text-blue-400 hover:text-blue-300 hover:underline focus:outline-none"
              @click="changeMode('register')"
              v-if="mode === 'login'"
            >
              Create an account
            </button>
            <button
              class="text-blue-400 hover:text-blue-300 hover:underline focus:outline-none"
              @click="changeMode('forgotPassword')"
              v-if="mode === 'login'"
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
