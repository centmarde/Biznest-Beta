// Validation result interface
export interface ValidationResult {
  isValid: boolean
  message: string
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, message: 'Email is required' }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' }
  }
  
  return { isValid: true, message: '' }
}

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: 'Password is required' }
  }
  
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' }
  }
  
  // Check for at least one letter and one number
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  
  if (!hasLetter || !hasNumber) {
    return { isValid: false, message: 'Password must contain at least one letter and one number' }
  }
  
  return { isValid: true, message: '' }
}

// Password confirmation validation
export const validatePasswordConfirmation = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, message: 'Password confirmation is required' }
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' }
  }
  
  return { isValid: true, message: '' }
}

// Full name validation
export const validateFullName = (name: string): ValidationResult => {
  if (!name) {
    return { isValid: false, message: 'Full name is required' }
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, message: 'Full name must be at least 2 characters long' }
  }
  
  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s\-']+$/
  if (!nameRegex.test(name)) {
    return { isValid: false, message: 'Full name can only contain letters, spaces, hyphens, and apostrophes' }
  }
  
  return { isValid: true, message: '' }
}

// Terms agreement validation
export const validateTermsAgreement = (agreed: boolean): ValidationResult => {
  if (!agreed) {
    return { isValid: false, message: 'You must agree to the terms and conditions' }
  }
  
  return { isValid: true, message: '' }
}

// Realtime validation composable
export const useRealtimeValidation = () => {
  const createValidator = (validatorFn: (value: any) => ValidationResult) => {
    return (value: any) => {
      return validatorFn(value)
    }
  }

  const createPasswordConfirmationValidator = (password: string) => {
    return (confirmPassword: string) => {
      return validatePasswordConfirmation(password, confirmPassword)
    }
  }

  return {
    validateEmail: createValidator(validateEmail),
    validatePassword: createValidator(validatePassword),
    validateFullName: createValidator(validateFullName),
    validateTermsAgreement: createValidator(validateTermsAgreement),
    createPasswordConfirmationValidator
  }
}

// Form validation helper
export const validateForm = (fields: Record<string, any>, validators: Record<string, (value: any) => ValidationResult>): { isValid: boolean, errors: Record<string, string> } => {
  const errors: Record<string, string> = {}
  let isValid = true

  for (const [fieldName, value] of Object.entries(fields)) {
    if (validators[fieldName]) {
      const result = validators[fieldName](value)
      if (!result.isValid) {
        errors[fieldName] = result.message
        isValid = false
      }
    }
  }

  return { isValid, errors }
}

// Alert helper for validation errors
export const createValidationAlert = (result: ValidationResult) => {
  if (!result.isValid) {
    return {
      title: 'Validation Error',
      description: result.message,
      variant: 'destructive' as const
    }
  }
  return null
}