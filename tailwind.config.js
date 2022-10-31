const forms = require("@tailwindcss/forms");

module.exports = {
    content: [
        "./themes/tailwind-example/**/*.{ftl,html,js}",
        "./themes/agosh/**/*.{ftl,html,js}",
    ],
    plugins: [forms],
};
