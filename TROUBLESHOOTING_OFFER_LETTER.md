# Troubleshooting Guide: Principal Signature & School Seal Not Showing

## Issue
Principal Signature and School Seal images are not appearing in the parent offer letter view.

## Root Cause Analysis

### 1. **Default Response Missing Fields**
   - ✅ **FIXED**: Updated the controller to return all fields even when no template exists in database
   - The default response was only returning `header_title`, `header_subtitle`, `watermark_text`, and `show_watermark`
   - Missing fields: `principal_signature`, `school_seal`, `header_logo`, `footer_text`, etc.

### 2. **Possible Issues to Check**

#### A. **No Data in Database**
   - The table `offer_letter_templates` exists (created by Sequelize sync)
   - But NO records have been saved yet
   - **Solution**: Admin must configure and save settings first

#### B. **Settings Not Saved**
   - Admin may have uploaded images but not clicked "Save Settings"
   - **Solution**: Ensure "Save Settings" button is clicked after uploading

#### C. **Image Upload Failed**
   - DigitalOcean Spaces configuration might be incorrect
   - Check `.env` file for proper credentials
   - **Solution**: Verify upload was successful (check browser console for errors)

## How to Fix

### Step 1: Restart Backend Server
The controller was updated. Restart the backend to apply changes:
```bash
# If using npm run dev, it should auto-restart
# Otherwise, manually restart
```

### Step 2: Configure Template Settings (Admin)
1. Log in as **Admin**
2. Go to **Offer Letters** page
3. Click the **Settings** (gear) icon
4. Upload images for:
   - Principal Signature
   - School Seal (optional)
   - School Logo (optional)
5. **Important**: Click **"Save Settings"** button
6. Wait for success message: "Template settings saved to database!"

### Step 3: Verify API Response
Open browser DevTools (F12) and check:
```javascript
// In Console tab:
fetch('http://localhost:4000/api/v1/psms/admission/settings/offer-letter', {
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
})
.then(r => r.json())
.then(d => console.log(d))
```

Expected response:
```json
{
    "success": true,
    "data": {
        "header_title": "YOUR SCHOOL NAME",
        "principal_signature": "https://cdn.space.com/...",
        "school_seal": "https://cdn.space.com/...",
        ...
    }
}
```

### Step 4: Check Parent View
1. Log in as **Parent**
2. Go to **/parent/dashboard/admissions/offers**
3. Signature and seal should now appear

## Debugging Checklist

- [ ] Backend server restarted
- [ ] Admin saved template settings
- [ ] API returns `principal_signature` and `school_seal` fields
- [ ] Image URLs are valid (start with `https://`)
- [ ] Browser console shows no errors
- [ ] Images display in admin preview
- [ ] Parent view refreshed (clear cache if needed)

## Expected Behavior

### When Settings ARE Saved
- **Admin Preview**: Shows signature and seal
- **Parent View**: Shows signature and seal
- **API Response**: Contains image URLs

### When Settings NOT Saved
- **Admin Preview**: Uses uploaded images from local state
- **Parent View**: Shows NO signature/seal (empty strings)
- **API Response**: Returns default empty strings

## Common Issues

### Images Show in Admin but Not Parent
- Admin view uses local state before saving
- Parent view uses database values
- **Fix**: Click "Save Settings" in admin

### "Upload Failed" Error
- Check DigitalOcean Spaces credentials
- Verify network connection
- Check browser console for detailed error

### Images Not Loading (Broken Image Icon)
- URL might be incorrect
- CORS issue (unlikely with DO Spaces)
- Image deleted from storage
- **Fix**: Re-upload images
