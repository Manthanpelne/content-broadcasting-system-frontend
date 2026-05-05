
const isMock = true; // Toggle this when the real backend is ready

export const apiClient = async (endpoint, options = {}) => {
  if (isMock) {
    // We will build a small mock interceptor here
    return mockInterceptor(endpoint, options);
  }
  
  // Real fetch logic would go here
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, options);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};


// This stays hidden and is only for the assignment
async function mockInterceptor(endpoint, options) {
  await new Promise(r => setTimeout(r, 800)); // Simulate lag
  
  if (endpoint === '/auth/login') {
    const body = JSON.parse(options.body);
    const role = body.email.includes('admin') ? 'PRINCIPAL' : 'TEACHER';
    return { 
      user: { id: '1', name: 'Manthan', role },
      token: 'fake-jwt-token'
    };
  }
  // Add other endpoints here as we build them...
}