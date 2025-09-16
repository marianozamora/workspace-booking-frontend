import { API_CONFIG } from '../services/api';

/**
 * Verify API configuration and provide helpful debugging information
 */
export const verifyApiConfig = (): void => {
  console.log('🔧 API Configuration:');
  console.log(`  Base URL: ${API_CONFIG.BASE_URL}`);
  console.log(`  API Key: ${API_CONFIG.API_KEY.slice(0, 8)}...`);
  console.log(`  Timeout: ${API_CONFIG.TIMEOUT}ms`);

  // Check if required environment variables are set
  const requiredEnvVars = ['VITE_API_BASE_URL', 'VITE_API_KEY'];
  const missingVars = requiredEnvVars.filter(
    varName => !import.meta.env[varName]
  );

  if (missingVars.length > 0) {
    console.warn('⚠️  Missing environment variables:', missingVars);
    console.warn('   Make sure your .env file is configured correctly');
  }

  // Validate API Key format
  if (API_CONFIG.API_KEY === 'default-api-key-change-in-production') {
    console.warn('⚠️  Using default API Key - update VITE_API_KEY in .env');
  }

  if (API_CONFIG.API_KEY.length < 8) {
    console.warn('⚠️  API Key might be too short');
  }
};

/**
 * Test API connectivity
 */
export const testApiConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'X-API-Key': API_CONFIG.API_KEY,
      },
    });
    
    if (response.ok) {
      console.log('✅ API connection successful');
      return true;
    } else {
      console.error(`❌ API connection failed with status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error('❌ API connection error:', error);
    return false;
  }
};

// Run verification in development mode
if (import.meta.env.DEV) {
  verifyApiConfig();
}