# Testimonials App Test Plan

## Application Overview

The Testimonials App is a web application for collecting anonymous testimonials and star ratings for the Vibe Coding course. Users can submit 1-5 star ratings along with text testimonials about what they built. The app provides features to view testimonials, export them to JSON, import from JSON files, and clear all testimonials. All data is stored locally using browser localStorage.

## Test Scenarios

### 1. Form Submission and Validation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Submit testimonial with all required fields

**File:** `tests/form-submission/submit-valid-testimonial.spec.ts`

**Steps:**
  1. Navigate to the testimonials app
    - expect: The page loads successfully with the heading 'Testimonials for Vibe Coding Course'
    - expect: The form is visible with rating stars and testimonial text area
  2. Click on the 5-star rating
    - expect: The 5-star rating is selected (visually highlighted)
  3. Enter text in the testimonial field: 'This course helped me build amazing projects with vibe coding'
    - expect: The text appears in the testimonial textarea
  4. Click the 'Submit Testimonial' button
    - expect: A success alert appears with message 'Thank you for your testimonial!'
    - expect: The form is cleared (rating deselected, text field emptied)
  5. Dismiss the alert
    - expect: The new testimonial appears in the testimonials list below the form
    - expect: The testimonial shows 5 filled stars and the submitted text

#### 1.2. Submit testimonial with different star ratings

**File:** `tests/form-submission/submit-various-ratings.spec.ts`

**Steps:**
  1. Navigate to the testimonials app
    - expect: The page loads successfully
  2. Select 3-star rating and enter testimonial text 'Good course, useful content'
    - expect: Both fields are filled correctly
  3. Click 'Submit Testimonial'
    - expect: Success alert appears
    - expect: Testimonial is added with 3 stars and the text
  4. Select 1-star rating and enter testimonial text 'Needs improvement'
    - expect: Both fields are filled
  5. Click 'Submit Testimonial'
    - expect: Success alert appears
    - expect: Testimonial is added with 1 star and the text
  6. Verify all three testimonials are displayed with correct ratings
    - expect: All three testimonials appear in the list with their respective star counts

#### 1.3. Submit without selecting a rating

**File:** `tests/form-submission/submit-no-rating.spec.ts`

**Steps:**
  1. Navigate to the testimonials app
    - expect: The page loads successfully
  2. Enter text in testimonial field: 'Great course' without selecting a rating
    - expect: Text is entered but no star rating is selected
  3. Click 'Submit Testimonial'
    - expect: An alert appears with message 'Please select a rating.'
    - expect: No testimonial is added to the list
    - expect: The form retains the entered text
  4. Dismiss the alert
    - expect: The alert closes
    - expect: The testimonial text is still in the field

#### 1.4. Submit without entering testimonial text

**File:** `tests/form-submission/submit-no-text.spec.ts`

**Steps:**
  1. Navigate to the testimonials app
    - expect: The page loads successfully
  2. Select a 4-star rating without entering any text in the testimonial field
    - expect: Star rating is selected, testimonial field is empty
  3. Click 'Submit Testimonial'
    - expect: An alert appears with message 'Please enter a testimonial.'
    - expect: No testimonial is added to the list
    - expect: The 4-star rating remains selected
  4. Dismiss the alert
    - expect: The alert closes
    - expect: The 4-star rating is still selected

#### 1.5. Submit with empty testimonial field containing only whitespace

**File:** `tests/form-submission/submit-whitespace-only.spec.ts`

**Steps:**
  1. Navigate to the testimonials app
    - expect: The page loads successfully
  2. Select a 3-star rating and enter only spaces in the testimonial field
    - expect: Star rating is selected, testimonial field contains whitespace
  3. Click 'Submit Testimonial'
    - expect: An alert appears with message 'Please enter a testimonial.'
    - expect: No testimonial is added (whitespace is trimmed)

### 2. Testimonial Display and Data Persistence

**Seed:** `tests/seed.spec.ts`

#### 2.1. Display 'No testimonials yet' message when empty

**File:** `tests/display/no-testimonials-message.spec.ts`

**Steps:**
  1. Navigate to the testimonials app in a fresh browser context (clear localStorage if needed)
    - expect: The page loads successfully
    - expect: The 'Recent Testimonials' section is visible
  2. Verify the testimonials list content
    - expect: The message 'No testimonials yet. Be the first to share!' is displayed

#### 2.2. Display multiple testimonials with correct star ratings

**File:** `tests/display/display-multiple-testimonials.spec.ts`

**Steps:**
  1. Navigate to the app and add a 5-star testimonial: 'Excellent course'
    - expect: The testimonial is saved and displayed with 5 filled stars (★★★★★)
  2. Add a 3-star testimonial: 'Good but could be better'
    - expect: The testimonial is displayed with 3 filled stars and 2 empty stars (★★★☆☆)
  3. Add a 1-star testimonial: 'Not satisfied'
    - expect: The testimonial is displayed with 1 filled star and 4 empty stars (★☆☆☆☆)
  4. Verify all three testimonials appear in the list
    - expect: All three testimonials are visible in order
    - expect: Each shows the correct star representation

#### 2.3. Data persists after page refresh

**File:** `tests/display/persistence-after-refresh.spec.ts`

**Steps:**
  1. Navigate to the app and submit a testimonial: 5-star rating with text 'Amazing experience'
    - expect: The testimonial is displayed successfully
    - expect: Alert confirms submission
  2. Refresh the page
    - expect: The page reloads
    - expect: The previously submitted testimonial is still visible in the list
  3. Submit another testimonial: 4-star rating with text 'Very good'
    - expect: Both testimonials are displayed
    - expect: Both persist correctly
  4. Close the browser tab and reopen the app URL
    - expect: Both testimonials are restored from localStorage and displayed

#### 2.4. Testimonials are stored and displayed in submission order

**File:** `tests/display/testimonial-order.spec.ts`

**Steps:**
  1. Submit first testimonial: 'First submission'
    - expect: Testimonial is displayed
  2. Submit second testimonial: 'Second submission'
    - expect: Both testimonials are visible, first submission appears first
  3. Submit third testimonial: 'Third submission'
    - expect: All three testimonials appear in submission order: First, Second, Third

### 3. Export Functionality

**Seed:** `tests/seed.spec.ts`

#### 3.1. Export testimonials to JSON file

**File:** `tests/export/export-to-json.spec.ts`

**Steps:**
  1. Navigate to the app and add testimonials: 5-star 'Great!' and 3-star 'Good'
    - expect: Both testimonials are displayed
  2. Click the 'Export Testimonials' button
    - expect: A file download is triggered
    - expect: Success alert appears: 'Testimonials exported successfully!'
    - expect: A JSON file named 'testimonials.json' is downloaded
  3. Verify the downloaded JSON file content
    - expect: File contains valid JSON array
    - expect: Array contains both testimonials with correct ratings and text
    - expect: Format is: [{rating: 5, testimonial: 'Great!'}, {rating: 3, testimonial: 'Good'}]

#### 3.2. Export empty testimonials list

**File:** `tests/export/export-empty-list.spec.ts`

**Steps:**
  1. Navigate to a fresh app with no testimonials
    - expect: 'No testimonials yet' message is displayed
  2. Click 'Export Testimonials'
    - expect: File download is triggered
    - expect: Success alert appears: 'Testimonials exported successfully!'
    - expect: Downloaded JSON file contains an empty array []

### 4. Import Functionality

**Seed:** `tests/seed.spec.ts`

#### 4.1. Import valid testimonials JSON file

**File:** `tests/import/import-valid-json.spec.ts`

**Steps:**
  1. Create a valid JSON file with testimonials: [{rating: 5, testimonial: 'Imported 1'}, {rating: 4, testimonial: 'Imported 2'}]
    - expect: JSON file is created and saved
  2. Navigate to the app with empty testimonials list
    - expect: 'No testimonials yet' message is displayed
  3. Click 'Import Testimonials' button
    - expect: A file chooser dialog appears
  4. Select the valid testimonials JSON file
    - expect: The file is selected and parsed
    - expect: Success alert appears: 'Testimonials imported successfully!'
  5. Verify the testimonials appear in the list
    - expect: Both imported testimonials are displayed
    - expect: First shows 5 stars with 'Imported 1' text
    - expect: Second shows 4 stars with 'Imported 2' text

#### 4.2. Import testimonials when list already has data

**File:** `tests/import/import-overwrites-data.spec.ts`

**Steps:**
  1. Add testimonials to the app: 3-star 'Original'
    - expect: Original testimonial is displayed
  2. Create and prepare to import JSON file: [{rating: 5, testimonial: 'New import'}]
    - expect: JSON file is ready
  3. Click 'Import Testimonials' and select the file
    - expect: Success alert appears
    - expect: Previous testimonial is removed
  4. Verify the list now contains only the imported testimonial
    - expect: Only 'New import' with 5 stars is displayed
    - expect: Original testimonial is no longer visible

#### 4.3. Import invalid JSON file

**File:** `tests/import/import-invalid-json.spec.ts`

**Steps:**
  1. Create a text file with invalid JSON: '{invalid json content}'
    - expect: File is created
  2. Click 'Import Testimonials' and select the invalid file
    - expect: Alert appears: 'Error reading file. Please ensure it\'s a valid JSON file.'
  3. Verify no testimonials were added
    - expect: The testimonials list is unchanged
    - expect: 'No testimonials yet' message remains if list was empty

#### 4.4. Import file with valid JSON but not array format

**File:** `tests/import/import-non-array-json.spec.ts`

**Steps:**
  1. Create a JSON file with object instead of array: {rating: 5, testimonial: 'Text'}
    - expect: JSON file is created as invalid format
  2. Click 'Import Testimonials' and select the file
    - expect: Alert appears: 'Invalid file format. Please select a valid testimonials JSON file.'
  3. Verify no testimonials were imported
    - expect: The testimonials list is unchanged

#### 4.5. Cancel file selection in import dialog

**File:** `tests/import/import-cancel.spec.ts`

**Steps:**
  1. Click 'Import Testimonials' button
    - expect: File chooser dialog opens
  2. Click 'Cancel' or close the dialog without selecting a file
    - expect: Dialog closes
    - expect: No alert appears
    - expect: No testimonials are modified

### 5. Clear All Testimonials

**Seed:** `tests/seed.spec.ts`

#### 5.1. Clear all testimonials with confirmation

**File:** `tests/clear/clear-with-confirmation.spec.ts`

**Steps:**
  1. Navigate to the app and add testimonials: 5-star 'First', 4-star 'Second', 2-star 'Third'
    - expect: All three testimonials are displayed
  2. Click the 'Clear All Testimonials' button
    - expect: A confirmation dialog appears with message: 'Are you sure you want to delete all testimonials? This action cannot be undone.'
    - expect: Dialog has OK and Cancel buttons
  3. Click 'OK' to confirm deletion
    - expect: All testimonials are removed from the display
    - expect: Success alert appears: 'All testimonials have been cleared.'
  4. Dismiss the alert
    - expect: The message 'No testimonials yet. Be the first to share!' is displayed

#### 5.2. Cancel clear action in confirmation dialog

**File:** `tests/clear/clear-cancel.spec.ts`

**Steps:**
  1. Navigate to the app with testimonials: 5-star 'Keep this'
    - expect: Testimonial is displayed
  2. Click 'Clear All Testimonials' button
    - expect: Confirmation dialog appears
  3. Click 'Cancel' to abort the deletion
    - expect: Dialog closes
    - expect: All testimonials remain unchanged
  4. Verify the testimonial 'Keep this' is still visible
    - expect: The testimonial is still displayed with its 5-star rating

#### 5.3. Clear testimonials when list is empty

**File:** `tests/clear/clear-empty-list.spec.ts`

**Steps:**
  1. Navigate to the app with no testimonials
    - expect: 'No testimonials yet' message is displayed
  2. Click 'Clear All Testimonials' button
    - expect: Confirmation dialog appears
  3. Click 'OK' to confirm
    - expect: Success alert appears: 'All testimonials have been cleared.'
    - expect: Page state remains with 'No testimonials yet' message

#### 5.4. Verify cleared testimonials are not restored after page refresh

**File:** `tests/clear/clear-persistence.spec.ts`

**Steps:**
  1. Add testimonials: 5-star 'Will be deleted'
    - expect: Testimonial is displayed
  2. Clear all testimonials with confirmation
    - expect: All testimonials removed, success alert appears
  3. Refresh the page
    - expect: 'No testimonials yet' message is displayed
    - expect: Cleared testimonials are not restored

### 6. User Interface and Accessibility

**Seed:** `tests/seed.spec.ts`

#### 6.1. All buttons and form elements are visible and accessible

**File:** `tests/ui/elements-visible.spec.ts`

**Steps:**
  1. Navigate to the testimonials app
    - expect: Page loads successfully
  2. Verify all UI elements are visible: heading, star ratings, testimonial textarea, Submit button, Export button, Import button, Clear button
    - expect: All elements are present and visible on the page
  3. Verify form elements are interactive and focusable
    - expect: Star rating inputs respond to clicks
    - expect: Textarea is focusable and accepts input
    - expect: All buttons are clickable

#### 6.2. Star rating visual feedback when selected

**File:** `tests/ui/star-visual-feedback.spec.ts`

**Steps:**
  1. Navigate to the app
    - expect: Page loads
  2. Click on each star (1 through 5) sequentially
    - expect: Each click shows visual feedback
    - expect: Selected star rating is clearly highlighted
    - expect: Previous selections are deselected
  3. Verify hovering over stars provides visual indication if applicable
    - expect: Hover states are visible and intuitive

#### 6.3. Form is responsive on different screen sizes

**File:** `tests/ui/responsive-design.spec.ts`

**Steps:**
  1. Navigate to the app on desktop view (1920x1080)
    - expect: Page displays correctly with proper spacing and alignment
  2. Resize to tablet view (768x1024)
    - expect: Form elements reflow properly
    - expect: All buttons and inputs remain accessible
  3. Resize to mobile view (375x667)
    - expect: Layout adapts for mobile
    - expect: Form elements are stacked appropriately
    - expect: Text remains readable

### 7. Error Handling and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 7.1. Handle special characters in testimonial text

**File:** `tests/edge-cases/special-characters.spec.ts`

**Steps:**
  1. Submit testimonial with special characters: 'Great! @#$% & <script>alert("xss")</script>'
    - expect: Testimonial is submitted successfully
    - expect: Special characters and HTML tags are displayed as plain text (not executed)
    - expect: No XSS attack occurs

#### 7.2. Handle very long testimonial text

**File:** `tests/edge-cases/long-testimonial.spec.ts`

**Steps:**
  1. Submit a testimonial with 5000+ characters of text
    - expect: Testimonial is accepted and saved
    - expect: Full text is displayed in the testimonials list
    - expect: No truncation or data loss occurs

#### 7.3. Handle multiple rapid form submissions

**File:** `tests/edge-cases/rapid-submissions.spec.ts`

**Steps:**
  1. Navigate to the app
    - expect: Page loads
  2. Rapidly submit 5 testimonials in quick succession without waiting for response
    - expect: All 5 testimonials are successfully added
    - expect: No data is lost or duplicated
    - expect: All appear in the testimonials list

#### 7.4. Verify form state after submission errors

**File:** `tests/edge-cases/form-state-after-error.spec.ts`

**Steps:**
  1. Attempt to submit without rating (should fail)
    - expect: Error alert appears
    - expect: Testimonial text remains in the field
  2. Now add a rating and submit
    - expect: Submission succeeds
    - expect: Form clears properly
  3. Attempt to submit without text (should fail)
    - expect: Error alert appears
    - expect: Rating remains selected
  4. Add text and submit
    - expect: Submission succeeds
    - expect: Form clears properly

### 8. Integration Scenarios

**Seed:** `tests/seed.spec.ts`

#### 8.1. Complete workflow: add, export, clear, import

**File:** `tests/integration/complete-workflow.spec.ts`

**Steps:**
  1. Add testimonials: 5-star 'Excellent', 3-star 'Average', 1-star 'Poor'
    - expect: All three testimonials are displayed
  2. Click 'Export Testimonials' and save the file
    - expect: File is downloaded successfully with all 3 testimonials
  3. Click 'Clear All Testimonials' and confirm
    - expect: All testimonials are removed
    - expect: 'No testimonials yet' message appears
  4. Click 'Import Testimonials' and select the previously exported file
    - expect: All 3 testimonials are restored
    - expect: Same data as before appears

#### 8.2. Export, modify JSON, and re-import with different data

**File:** `tests/integration/export-modify-import.spec.ts`

**Steps:**
  1. Add testimonial: 5-star 'Original'
    - expect: Testimonial is displayed
  2. Export the testimonial to JSON file
    - expect: File downloaded successfully
  3. Manually edit the JSON file to change rating to 2 and text to 'Modified'
    - expect: File is edited successfully
  4. Clear all testimonials in the app
    - expect: List is empty
  5. Import the modified JSON file
    - expect: Testimonial appears with 2-star rating and 'Modified' text

#### 8.3. Add testimonials across multiple sessions

**File:** `tests/integration/multiple-sessions.spec.ts`

**Steps:**
  1. Open the app and add testimonial: 5-star 'Session 1'
    - expect: Testimonial is displayed and saved
  2. Close the browser window/tab
    - expect: Window closes
  3. Reopen the app in a new window/tab
    - expect: Previous testimonial 'Session 1' is still displayed
  4. Add new testimonial: 4-star 'Session 2'
    - expect: Both testimonials are now displayed
  5. Verify both testimonials persist after another page refresh
    - expect: Both 'Session 1' and 'Session 2' are displayed
