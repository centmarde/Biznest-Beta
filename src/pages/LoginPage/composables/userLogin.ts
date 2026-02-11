import { ref } from "vue"
import { useRouter } from 'vue-router'

export function useLogin() {
    const router = useRouter()

    const email = ref('')
    const password = ref('')
    const rememberMe = ref(false)

    const login = async () => {
        console.log('Email login:', {
            email: email.value,
            password: password.value,
            rememberMe: rememberMe.value
        })
    }

    // OAuth login methods
    const loginWithGoogle = () => {
        console.log('Login with Google')
        // Implement Google OAuth logic here
    }

    const loginWithFacebook = () => {
        console.log('Login with Facebook')
        // Implement Facebook OAuth logic here
    }

    const loginWithApple = () => {
        console.log('Login with Apple')
        // Implement Apple OAuth logic here
    }

    // Utility methods
    const forgotPassword = () => {
        console.log('Forgot password clicked')
        // Navigate to forgot password page or show modal
    }

    const goToSignUp = () => {
        console.log('Go to sign up clicked')
        router.push('/signup')
    }

    return {
        email,
        password,
        rememberMe,
        login,
        loginWithGoogle,
        loginWithApple,
        loginWithFacebook,
        forgotPassword,
        goToSignUp
    }
}
