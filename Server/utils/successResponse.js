export const successResponse = (message, key, value) => {
    return {
      success: true,
      message,
      [key]: value,
    };
  };
  