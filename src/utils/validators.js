/**
 * Funções de validação reutilizáveis
 */

export const validators = {
  /**
   * Valida se o campo está preenchido
   */
  required: (value, fieldName = 'Campo') => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return `${fieldName} é obrigatório`;
    }
    return null;
  },

  /**
   * Valida email
   */
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Email inválido';
    }
    return null;
  },

  /**
   * Valida tamanho mínimo
   */
  minLength: (value, min, fieldName = 'Campo') => {
    if (value.length < min) {
      return `${fieldName} deve ter no mínimo ${min} caracteres`;
    }
    return null;
  },

  /**
   * Valida tamanho máximo
   */
  maxLength: (value, max, fieldName = 'Campo') => {
    if (value.length > max) {
      return `${fieldName} deve ter no máximo ${max} caracteres`;
    }
    return null;
  },

  /**
   * Valida número
   */
  isNumber: (value, fieldName = 'Campo') => {
    if (isNaN(value)) {
      return `${fieldName} deve ser um número`;
    }
    return null;
  },

  /**
   * Valida número positivo
   */
  isPositive: (value, fieldName = 'Campo') => {
    if (Number(value) <= 0) {
      return `${fieldName} deve ser maior que zero`;
    }
    return null;
  },

  /**
   * Valida se é inteiro
   */
  isInteger: (value, fieldName = 'Campo') => {
    if (!Number.isInteger(Number(value))) {
      return `${fieldName} deve ser um número inteiro`;
    }
    return null;
  },

  /**
   * Valida username (alfanumérico + underscore)
   */
  username: (value) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(value)) {
      return 'Username deve conter apenas letras, números e underscore';
    }
    return null;
  },

  /**
   * Valida senha forte
   */
  strongPassword: (value) => {
    if (value.length < 6) {
      return 'Senha deve ter no mínimo 6 caracteres';
    }
    return null;
  },
};

/**
 * Valida múltiplos campos
 * @param {Object} values - Objeto com valores dos campos
 * @param {Object} rules - Objeto com regras de validação
 * @returns {Object} Objeto com erros (vazio se tudo ok)
 * 
 * Exemplo:
 * const errors = validateForm(
 *   { username: 'john', email: 'invalid' },
 *   {
 *     username: [validators.required, validators.username],
 *     email: [validators.required, validators.email]
 *   }
 * );
 */
export const validateForm = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field];
    const value = values[field];

    for (const rule of fieldRules) {
      const error = rule(value, field);
      if (error) {
        errors[field] = error;
        break; // Para na primeira validação que falhar
      }
    }
  });

  return errors;
};

export default validators;
