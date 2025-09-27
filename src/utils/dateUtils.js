// Utility function to get formatted current date
export const getCurrentDate = () => {
  const currentDate = new Date();
  return currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Function to get current date in different formats
export const getFormattedDate = (format = 'long') => {
  const currentDate = new Date();
  
  switch (format) {
    case 'short':
      return currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    case 'long':
    default:
      return currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
  }
};
