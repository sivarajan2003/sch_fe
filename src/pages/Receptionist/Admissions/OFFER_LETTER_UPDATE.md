# Offer Letter Customization Update

## Overview
Connected the Offer Letter customization feature to the backend database, making the settings persistent and shared across the institution.

## Technical Changes
1.  **Backend Integration**:
    -   Created a new database model `OfferLetterTemplate` to store settings.
    -   Added API endpoints:
        -   `GET /api/v1/psms/admission/settings/offer-letter`: Fetch current settings.
        -   `POST /api/v1/psms/admission/settings/offer-letter`: Save new settings.
    -    implemented a new controller `offerletter.controller.js` to handle these requests.

2.  **Frontend Logic**:
    -   Updated `OfferLetters.tsx` to fetch settings from the API when the page loads, instead of relying on local browser storage (`localStorage`).
    -   Updated the "Save Settings" button to send the configuration to the backend API.
    -   Added data mapping to convert between the frontend's camelCase state and the database's snake_case fields.

## Features
-   **Persistence**: Settings are now saved in the cloud database. If you change a setting on one computer, it will appear on others.
-   **Security**: Access to these settings is restricted to authorized roles (Super Admin, Admin, Receptionist).

## Usage
No change in usage flow for the user. Simply use the "Settings" modal as before. The saving process is now more robust behind the scenes.
