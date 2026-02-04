import { configureStore, combineReducers } from '@reduxjs/toolkit';
import admissionFormReducer from './slices/admissionFormSlice';

// Combine all reducers
const rootReducer = combineReducers({
    admissionForm: admissionFormReducer,
    // Add more reducers here as needed
});

// Create the Redux store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['admissionForm/setDocumentFile'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['payload.file'],
                // Ignore these paths in the state
                ignoredPaths: [
                    'admissionForm.birth_certificate_file',
                    'admissionForm.tc_certificate_file',
                    'admissionForm.passport_size_photo_file',
                    'admissionForm.address_proof_file',
                ],
            },
        }),
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Local Storage Persistence
const STORAGE_KEY = 'admission_form_state';

// Save state to localStorage
export const saveStateToLocalStorage = (state: RootState) => {
    try {
        // Create a copy of the state without File objects
        const stateToSave = {
            ...state,
            admissionForm: {
                ...state.admissionForm,
                // Exclude File objects as they can't be serialized
                birth_certificate_file: null,
                tc_certificate_file: null,
                passport_size_photo_file: null,
                address_proof_file: null,
            },
        };

        const serializedState = JSON.stringify(stateToSave);
        localStorage.setItem(STORAGE_KEY, serializedState);
    } catch (error) {
        console.error('Error saving state to localStorage:', error);
    }
};

// Load state from localStorage
export const loadStateFromLocalStorage = (): Partial<RootState> | undefined => {
    try {
        const serializedState = localStorage.getItem(STORAGE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Error loading state from localStorage:', error);
        return undefined;
    }
};

// Clear state from localStorage
export const clearStateFromLocalStorage = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing state from localStorage:', error);
    }
};

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
    saveStateToLocalStorage(store.getState());
});

export default store;
