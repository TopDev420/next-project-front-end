// @ts-nocheck
/* eslint-disable */
import { TailwindConfig } from 'tailwindcss/tailwind-config';

const theme: TailwindConfig['theme'] = preval`
    const resolveConfig = require('tailwindcss/resolveConfig');
    const tailwindConfig = require('../tailwind.config.js');
    module.exports = resolveConfig(tailwindConfig).theme;
`;

export default theme;
