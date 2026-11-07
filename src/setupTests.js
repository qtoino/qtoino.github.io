// Referenced by "setupFilesAfterEnv" in package.json; Jest refuses to start without it.
// Adds custom matchers like toBeInTheDocument().
import '@testing-library/jest-dom';

// react-router 7 needs TextEncoder, which Jest 27's jsdom doesn't provide.
import { TextEncoder, TextDecoder } from 'util';
if (!global.TextEncoder) global.TextEncoder = TextEncoder;
if (!global.TextDecoder) global.TextDecoder = TextDecoder;
