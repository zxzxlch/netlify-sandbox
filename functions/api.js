import serverless from 'serverless-http';
import expressApp from './app';

const functionName = 'api';

// Initialize express app
const app = expressApp(functionName);

// Export lambda handler
exports.handler = serverless(app);
