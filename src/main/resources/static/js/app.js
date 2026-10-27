/**
 * IIUC Course Management Portal - Modern Frontend Application
 * Interacts with Spring Boot REST API: /api/courses
 */

// Application State
const state = {
  courses: [],
  filteredCourses: [],
  currentEditId: null,
  deleteTargetId: null,
  isApiConnected: false,
  viewMode: localStorage.getItem('iiuc_view_mode') || 'grid',
  theme: localStorage.getItem('iiuc_theme') || 'light',
  searchQuery: '',
  selectedDept: 'ALL',
  selectedType: 'ALL',
  selectedSemester: 'ALL',
  syllabusData: {}
};

const FALLBACK_COURSES = [
  { courseId: 100, courseCode: "CSE-1101", courseTitle: "Structured Programming", courseCredit: 3.0, courseType: "Theory", semesterOffered: "1st", deptName: "Computer Science and Engineering (CSE)", instructor: "Dr. Mohammad Shahidul Islam" },
  { courseId: 101, courseCode: "CSE-1102", courseTitle: "Structured Programming Lab", courseCredit: 1.5, courseType: "Lab", semesterOffered: "1st", deptName: "Computer Science and Engineering (CSE)", instructor: "Engr. Tanvir Ahmed" },
  { courseId: 102, courseCode: "CCE-2101", courseTitle: "Digital Logic Design", courseCredit: 3.0, courseType: "Theory", semesterOffered: "3rd", deptName: "Computer and Communication Engineering (CCE)", instructor: "Dr. Kazi Tanvir" },
  { courseId: 103, courseCode: "EEE-2103", courseTitle: "Electrical Circuits & Devices", courseCredit: 3.0, courseType: "Theory", semesterOffered: "3rd", deptName: "Electrical and Electronic Engineering (EEE)", instructor: "Dr. Faisal Hossain" },
  { courseId: 104, courseCode: "ETE-3101", courseTitle: "Wireless Communication", courseCredit: 3.0, courseType: "Theory", semesterOffered: "5th", deptName: "Electronic and Telecommunication Engineering (ETE)", instructor: "Dr. Tariqul Islam" },
  { courseId: 105, courseCode: "CE-1201", courseTitle: "Surveying & Leveling", courseCredit: 3.0, courseType: "Theory", semesterOffered: "2nd", deptName: "Civil Engineering (CE)", instructor: "Engr. Md. Rashedul Islam" },
  { courseId: 106, courseCode: "PHARM-1101", courseTitle: "Inorganic & Physical Pharmacy", courseCredit: 3.0, courseType: "Theory", semesterOffered: "1st", deptName: "Pharmacy", instructor: "Dr. Nazmul Hasan" },
  { courseId: 107, courseCode: "ELL-1101", courseTitle: "Introduction to English Literature", courseCredit: 3.0, courseType: "Theory", semesterOffered: "1st", deptName: "English Language and Literature", instructor: "Ms. Farzana Akhter" },
  { courseId: 108, courseCode: "ALL-1101", courseTitle: "Arabic Grammar & Composition", courseCredit: 3.0, courseType: "Theory", semesterOffered: "1st", deptName: "Arabic Language and Literature", instructor: "Dr. Abdul Malik" },
  { courseId: 109, courseCode: "QSIS-1101", courseTitle: "Ulum al-Qur'an & Tajweed", courseCredit: 2.0, courseType: "Theory", semesterOffered: "1st", deptName: "Qur'anic Sciences and Islamic Studies", instructor: "Dr. Abu Bakar Siddique" },
  { courseId: 110, courseCode: "DIS-1201", courseTitle: "Principles & Methodology of Da'wah", courseCredit: 2.0, courseType: "Theory", semesterOffered: "2nd", deptName: "Da'wah and Islamic Studies", instructor: "Dr. Mizanur Rahman" },
  { courseId: 111, courseCode: "SHIS-2101", courseTitle: "Science of Hadith & Verification", courseCredit: 3.0, courseType: "Theory", semesterOffered: "3rd", deptName: "Science of Hadith and Islamic Studies", instructor: "Prof. Dr. Manzur Elahi" },
  { courseId: 112, courseCode: "BBA-1101", courseTitle: "Principles of Management", courseCredit: 3.0, courseType: "Theory", semesterOffered: "1st", deptName: "Business Administration", instructor: "Prof. Dr. Farid Ahmad" },
  { courseId: 113, courseCode: "FIN-2101", courseTitle: "Financial Accounting & Reporting", courseCredit: 3.0, courseType: "Theory", semesterOffered: "3rd", deptName: "Finance", instructor: "Dr. Mahmudul Hasan" },
  { courseId: 114, courseCode: "EB-1101", courseTitle: "Microeconomics & Banking Systems", courseCredit: 3.0, courseType: "Theory", semesterOffered: "1st", deptName: "Economics and Banking", instructor: "Dr. Shah Alam" },
  { courseId: 115, courseCode: "LLM-1101", courseTitle: "Legal System of Bangladesh & Land Law", courseCredit: 3.0, courseType: "Theory", semesterOffered: "1st", deptName: "Law and Land Management", instructor: "Adv. Saifuddin Khaled" }
];

// DOM Element Selectors
const elements = {
  // Theme & Status
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  themeIconSun: document.getElementById('themeIconSun'),
  themeIconMoon: document.getElementById('themeIconMoon'),
  apiStatusBadge: document.getElementById('apiStatusBadge'),
  apiStatusText: document.getElementById('apiStatusText'),

  // Metrics
  statTotalCourses: document.getElementById('statTotalCourses'),
  statTotalCredits: document.getElementById('statTotalCredits'),
  statDepartments: document.getElementById('statDepartments'),
  statInstructors: document.getElementById('statInstructors'),

  // Controls & Filters
  searchInput: document.getElementById('searchInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  filterDept: document.getElementById('filterDept'),
  filterType: document.getElementById('filterType'),
  filterSemester: document.getElementById('filterSemester'),
  viewGridBtn: document.getElementById('viewGridBtn'),
  viewTableBtn: document.getElementById('viewTableBtn'),
  refreshBtn: document.getElementById('refreshBtn'),
  resetFiltersBtn: document.getElementById('resetFiltersBtn'),

  // Views & Containers
  coursesGridView: document.getElementById('coursesGridView'),
  coursesTableView: document.getElementById('coursesTableView'),
  coursesTableBody: document.getElementById('coursesTableBody'),
  loadingState: document.getElementById('loadingState'),
  emptyState: document.getElementById('emptyState'),
  emptyStateMessage: document.getElementById('emptyStateMessage'),

  // Course Dialog
  openAddModalBtn: document.getElementById('openAddModalBtn'),
  courseDialog: document.getElementById('courseDialog'),
  dialogTitle: document.getElementById('dialogTitle'),
  closeDialogBtn: document.getElementById('closeDialogBtn'),
  cancelDialogBtn: document.getElementById('cancelDialogBtn'),
  courseForm: document.getElementById('courseForm'),
  saveCourseBtn: document.getElementById('saveCourseBtn'),
  saveBtnSpinner: document.getElementById('saveBtnSpinner'),
  saveBtnText: document.getElementById('saveBtnText'),
  courseIdField: document.getElementById('courseIdField'),
  courseCode: document.getElementById('courseCode'),
  courseCredit: document.getElementById('courseCredit'),
  courseTitle: document.getElementById('courseTitle'),
  courseType: document.getElementById('courseType'),
  semesterOffered: document.getElementById('semesterOffered'),
  deptName: document.getElementById('deptName'),
  instructor: document.getElementById('instructor'),
  prerequisite: document.getElementById('prerequisite'),

  // Delete Dialog
  deleteDialog: document.getElementById('deleteDialog'),
  deleteCourseTarget: document.getElementById('deleteCourseTarget'),
  cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),
  confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
  deleteBtnSpinner: document.getElementById('deleteBtnSpinner'),
  deleteBtnText: document.getElementById('deleteBtnText'),

  // Syllabus Modal Elements
  syllabusDialog: document.getElementById('syllabusDialog'),
  sylCourseCode: document.getElementById('sylCourseCode'),
  sylCourseType: document.getElementById('sylCourseType'),
  sylCreditHours: document.getElementById('sylCreditHours'),
  sylPrereqBadge: document.getElementById('sylPrereqBadge'),
  syllabusDialogTitle: document.getElementById('syllabusDialogTitle'),
  closeSyllabusDialogBtn: document.getElementById('closeSyllabusDialogBtn'),
  closeSyllabusBottomBtn: document.getElementById('closeSyllabusBottomBtn'),
  sylRationale: document.getElementById('sylRationale'),
  sylObjectives: document.getElementById('sylObjectives'),
  sylMetaGrid: document.getElementById('sylMetaGrid'),
  sylClosTableBody: document.getElementById('sylClosTableBody'),
  sylMidtermList: document.getElementById('sylMidtermList'),
  sylFinalList: document.getElementById('sylFinalList'),
  sylTextbooksList: document.getElementById('sylTextbooksList'),
  sylReferenceBooksList: document.getElementById('sylReferenceBooksList'),
  sylMarksContainer: document.getElementById('sylMarksContainer'),

  // Toast Container
  toastContainer: document.getElementById('toastContainer')
};

// =============================================================================
// Initialization
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDialogLightDismissFallbacks();
  setupEventListeners();
  setupSyllabusEvents();
  applyViewMode(state.viewMode);
  fetchCourses();
  fetchSyllabusDetails();
});

// =============================================================================
// Theme Handling
// =============================================================================

function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  document.documentElement.classList.toggle('dark', state.theme === 'dark');
  updateThemeIcons();
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('iiuc_theme', state.theme);
  document.documentElement.setAttribute('data-theme', state.theme);
  document.documentElement.classList.toggle('dark', state.theme === 'dark');
  updateThemeIcons();
}

function updateThemeIcons() {
  if (state.theme === 'dark') {
    elements.themeIconSun.classList.remove('hidden');
    elements.themeIconMoon.classList.add('hidden');
  } else {
    elements.themeIconSun.classList.add('hidden');
    elements.themeIconMoon.classList.remove('hidden');
  }
}

// =============================================================================
// Modern Web Guidance: Light-Dismiss Fallback for <dialog>
// =============================================================================

function initDialogLightDismissFallbacks() {
  const dialogs = [elements.courseDialog, elements.deleteDialog, elements.syllabusDialog];
  dialogs.forEach(dialog => {
    if (!dialog) return;
    // Fallback for browsers without closedby support
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );
        if (isDialogContent) return;
        dialog.close();
      });
    }
  });
}

// =============================================================================
// Event Listeners
// =============================================================================

function setupEventListeners() {
  // Theme Toggle
  elements.themeToggleBtn.addEventListener('click', toggleTheme);

  // Search Input
  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim().toLowerCase();
    elements.clearSearchBtn.classList.toggle('hidden', state.searchQuery.length === 0);
    applyFilters();
  });

  elements.clearSearchBtn.addEventListener('click', () => {
    elements.searchInput.value = '';
    state.searchQuery = '';
    elements.clearSearchBtn.classList.add('hidden');
    elements.searchInput.focus();
    applyFilters();
  });

  // Filter Selects
  elements.filterDept.addEventListener('change', (e) => {
    state.selectedDept = e.target.value;
    applyFilters();
  });

  elements.filterType.addEventListener('change', (e) => {
    state.selectedType = e.target.value;
    applyFilters();
  });

  elements.filterSemester.addEventListener('change', (e) => {
    state.selectedSemester = e.target.value;
    applyFilters();
  });

  // View Switchers
  elements.viewGridBtn.addEventListener('click', () => applyViewMode('grid'));
  elements.viewTableBtn.addEventListener('click', () => applyViewMode('table'));

  // Refresh & Reset Buttons
  elements.refreshBtn.addEventListener('click', () => {
    showToast('Refreshing courses...', 'info');
    fetchCourses();
  });

  elements.resetFiltersBtn.addEventListener('click', resetAllFilters);

  // Modal Open & Close Triggers
  elements.openAddModalBtn.addEventListener('click', openAddCourseModal);
  elements.closeDialogBtn.addEventListener('click', () => elements.courseDialog.close());
  elements.cancelDialogBtn.addEventListener('click', () => elements.courseDialog.close());

  elements.cancelDeleteBtn.addEventListener('click', () => elements.deleteDialog.close());
  elements.confirmDeleteBtn.addEventListener('click', handleConfirmDelete);

  // Form Submission
  elements.courseForm.addEventListener('submit', handleFormSubmit);

  // Global Keyboard Shortcuts (Press '/' to focus search, 'Escape' closes modal)
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== elements.searchInput && !elements.courseDialog.open) {
      e.preventDefault();
      elements.searchInput.focus();
    }
  });
}

// =============================================================================
// API Service & Data Fetching
// =============================================================================

async function fetchCourses() {
  setLoading(true);
  try {
    const response = await fetch('/api/courses');
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }
    const data = await response.json();
    state.courses = Array.isArray(data) ? data : [];
    setApiStatus(true, `API Connected (${state.courses.length} courses)`);
  } catch (error) {
    console.warn('Backend API not reachable at /api/courses, attempting static data catalog:', error);
    try {
      const staticRes = await fetch('data/courses.json').catch(() => fetch('/data/courses.json'));
      if (staticRes && staticRes.ok) {
        const staticData = await staticRes.json();
        state.courses = Array.isArray(staticData) ? staticData : [];
        setApiStatus(true, `Catalog Loaded (${state.courses.length} courses)`);
      } else {
        throw new Error('Static catalog file not found');
      }
    } catch (e2) {
      if (state.courses.length === 0) {
        state.courses = [...FALLBACK_COURSES];
      }
      setApiStatus(false, 'API Disconnected (Demo Mode)');
    }
  } finally {
    setLoading(false);
    populateDepartmentOptions();
    applyFilters();
  }
}

function setApiStatus(isOnline, text) {
  state.isApiConnected = isOnline;
  elements.apiStatusBadge.classList.toggle('online', isOnline);
  elements.apiStatusBadge.classList.toggle('offline', !isOnline);
  elements.apiStatusText.textContent = text;
}

function setLoading(isLoading) {
  elements.loadingState.classList.toggle('hidden', !isLoading);
  if (isLoading) {
    elements.coursesGridView.classList.add('hidden');
    elements.coursesTableView.classList.add('hidden');
    elements.emptyState.classList.add('hidden');
  }
}

// =============================================================================
// Filters, Search & Metrics
// =============================================================================

function applyFilters() {
  state.filteredCourses = state.courses.filter(course => {
    // Search query matches code, title, department, instructor, prerequisite, or syllabus topics
    const syl = state.syllabusData && state.syllabusData[course.courseCode];
    const matchesSyllabus = syl && (
      (syl.courseRationale && syl.courseRationale.toLowerCase().includes(state.searchQuery)) ||
      (syl.midtermContent && syl.midtermContent.some(m => m.topic && m.topic.toLowerCase().includes(state.searchQuery))) ||
      (syl.finalContent && syl.finalContent.some(f => f.topic && f.topic.toLowerCase().includes(state.searchQuery))) ||
      (syl.textbooks && syl.textbooks.some(t => t.title && t.title.toLowerCase().includes(state.searchQuery)))
    );

    const matchesSearch = !state.searchQuery || (
      (course.courseCode && course.courseCode.toLowerCase().includes(state.searchQuery)) ||
      (course.courseTitle && course.courseTitle.toLowerCase().includes(state.searchQuery)) ||
      (course.deptName && course.deptName.toLowerCase().includes(state.searchQuery)) ||
      (course.instructor && course.instructor.toLowerCase().includes(state.searchQuery)) ||
      (course.prerequisite && course.prerequisite.toLowerCase().includes(state.searchQuery)) ||
      matchesSyllabus
    );

    // Department filter
    const matchesDept = state.selectedDept === 'ALL' || 
      (course.deptName && (
        course.deptName.toLowerCase() === state.selectedDept.toLowerCase() ||
        course.deptName.toLowerCase().includes(state.selectedDept.toLowerCase()) ||
        state.selectedDept.toLowerCase().includes(course.deptName.toLowerCase())
      ));

    // Type filter
    const matchesType = state.selectedType === 'ALL' || 
      (course.courseType && course.courseType.toLowerCase() === state.selectedType.toLowerCase());

    // Semester filter
    const matchesSemester = state.selectedSemester === 'ALL' || 
      (course.semesterOffered && course.semesterOffered.toLowerCase() === state.selectedSemester.toLowerCase());

    return matchesSearch && matchesDept && matchesType && matchesSemester;
  });

  updateMetrics();
  renderCourses();
}

function resetAllFilters() {
  state.searchQuery = '';
  state.selectedDept = 'ALL';
  state.selectedType = 'ALL';
  state.selectedSemester = 'ALL';

  elements.searchInput.value = '';
  elements.clearSearchBtn.classList.add('hidden');
  elements.filterDept.value = 'ALL';
  elements.filterType.value = 'ALL';
  elements.filterSemester.value = 'ALL';

  applyFilters();
}

function populateDepartmentOptions() {
  if (!elements.filterDept) return;
  const existingOptions = new Set(Array.from(elements.filterDept.querySelectorAll('option')).map(o => o.value.toLowerCase()));
  
  const customDepts = new Set();
  state.courses.forEach(c => {
    if (c.deptName && !existingOptions.has(c.deptName.toLowerCase())) {
      customDepts.add(c.deptName.trim());
    }
  });

  if (customDepts.size > 0) {
    let customGroup = elements.filterDept.querySelector('optgroup[data-custom="true"]');
    if (!customGroup) {
      customGroup = document.createElement('optgroup');
      customGroup.label = 'Additional Departments';
      customGroup.setAttribute('data-custom', 'true');
      elements.filterDept.appendChild(customGroup);
    }
    customGroup.innerHTML = '';
    customDepts.forEach(dept => {
      const opt = document.createElement('option');
      opt.value = dept;
      opt.textContent = dept;
      customGroup.appendChild(opt);
    });
  }
}

function updateMetrics() {
  const totalCourses = state.courses.length;
  const totalCredits = state.courses.reduce((sum, c) => sum + (parseFloat(c.courseCredit) || 0), 0);
  
  const depts = new Set(state.courses.map(c => c.deptName).filter(Boolean));
  const instructors = new Set(state.courses.map(c => c.instructor).filter(Boolean));

  elements.statTotalCourses.textContent = totalCourses;
  elements.statTotalCredits.textContent = totalCredits.toFixed(1);
  elements.statDepartments.textContent = depts.size;
  elements.statInstructors.textContent = instructors.size;
}

// =============================================================================
// Rendering (Cards & Table)
// =============================================================================

function applyViewMode(mode) {
  state.viewMode = mode;
  localStorage.setItem('iiuc_view_mode', mode);

  elements.viewGridBtn.classList.toggle('active', mode === 'grid');
  elements.viewTableBtn.classList.toggle('active', mode === 'table');

  renderCourses();
}

function renderCourses() {
  const hasCourses = state.filteredCourses.length > 0;

  elements.emptyState.classList.toggle('hidden', hasCourses);
  if (!hasCourses) {
    elements.coursesGridView.classList.add('hidden');
    elements.coursesTableView.classList.add('hidden');
    return;
  }

  if (state.viewMode === 'grid') {
    elements.coursesGridView.classList.remove('hidden');
    elements.coursesTableView.classList.add('hidden');
    renderGridView();
  } else {
    elements.coursesGridView.classList.add('hidden');
    elements.coursesTableView.classList.remove('hidden');
    renderTableView();
  }
}

function getDeptShortName(deptName) {
  if (!deptName) return 'General';
  const match = deptName.match(/\(([^)]+)\)/);
  if (match) return match[1];
  if (deptName.includes('English')) return 'ELL';
  if (deptName.includes('Arabic')) return 'ALL';
  if (deptName.includes('Qur') || deptName.includes('Quran')) return 'QSIS';
  if (deptName.includes('Da\'wah') || deptName.includes('Dawah')) return 'DIS';
  if (deptName.includes('Hadith')) return 'SHIS';
  if (deptName.includes('Business')) return 'BBA';
  if (deptName.includes('Finance')) return 'Finance';
  if (deptName.includes('Economics')) return 'Economics';
  if (deptName.includes('Law')) return 'Law';
  if (deptName.includes('Pharmacy')) return 'Pharmacy';
  return deptName;
}

function renderGridView() {
  elements.coursesGridView.innerHTML = state.filteredCourses.map(course => {
    const isTheory = (course.courseType || '').toLowerCase() === 'theory';
    const badgeClass = isTheory ? 'badge-theory' : 'badge-lab';
    const shortDept = getDeptShortName(course.deptName);

    return `
      <article class="course-card" data-id="${course.courseId}">
        <div>
          <div class="card-top">
            <span class="course-code-badge">${escapeHtml(course.courseCode || 'N/A')}</span>
            <div class="badges-row">
              <span class="badge ${badgeClass}">${escapeHtml(course.courseType || 'Course')}</span>
              <span class="badge badge-dept" title="${escapeHtml(course.deptName || '')}">${escapeHtml(shortDept)}</span>
            </div>
          </div>

          <h3 class="course-card-title">${escapeHtml(course.courseTitle || 'Untitled Course')}</h3>

          <div class="course-meta-details">
            <div class="meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span><strong>Instructor:</strong> ${escapeHtml(course.instructor || 'TBA')}</span>
            </div>
            <div class="meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span><strong>Semester:</strong> ${escapeHtml(course.semesterOffered || 'All')}</span>
            </div>
            <div class="meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
                <path d="M9 22v-4h6v4"></path>
              </svg>
              <span><strong>Dept:</strong> ${escapeHtml(course.deptName || 'General')}</span>
            </div>
            ${course.prerequisite ? `
            <div class="meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 14 14"></polyline>
              </svg>
              <span><strong>Prerequisite:</strong> <span class="badge badge-prereq">${escapeHtml(course.prerequisite)}</span></span>
            </div>` : ''}
          </div>
        </div>

        <div class="card-footer">
          <span class="credit-tag">${course.courseCredit} Credit Hours</span>
          <div class="card-actions">
            <button class="action-btn action-btn-syllabus" title="View Detailed Syllabus" onclick="openSyllabusModal('${escapeHtml(course.courseCode)}')" aria-label="View syllabus">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
                <path d="M6 6h10"></path>
                <path d="M6 10h10"></path>
              </svg>
            </button>
            <button class="action-btn" title="Edit Course" onclick="openEditCourseModal(${course.courseId})" aria-label="Edit course">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
              </svg>
            </button>
            <button class="action-btn action-btn-danger" title="Delete Course" onclick="openDeleteCourseModal(${course.courseId})" aria-label="Delete course">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderTableView() {
  elements.coursesTableBody.innerHTML = state.filteredCourses.map(course => {
    const isTheory = (course.courseType || '').toLowerCase() === 'theory';
    const badgeClass = isTheory ? 'badge-theory' : 'badge-lab';

    return `
      <tr data-id="${course.courseId}">
        <td style="font-family: var(--font-mono); color: var(--text-muted);">#${course.courseId}</td>
        <td><strong style="font-family: var(--font-mono);">${escapeHtml(course.courseCode || '')}</strong></td>
        <td>${escapeHtml(course.courseTitle || '')}</td>
        <td><strong>${course.courseCredit}</strong> hrs</td>
        <td><span class="badge ${badgeClass}">${escapeHtml(course.courseType || '')}</span></td>
        <td>${course.prerequisite ? `<span class="badge badge-prereq">${escapeHtml(course.prerequisite)}</span>` : '<span style="color:var(--text-muted);">-</span>'}</td>
        <td><span class="badge badge-dept">${escapeHtml(course.deptName || '')}</span></td>
        <td>${escapeHtml(course.semesterOffered || '')}</td>
        <td>${escapeHtml(course.instructor || '')}</td>
        <td class="text-right">
          <div class="card-actions" style="justify-content: flex-end;">
            <button class="action-btn action-btn-syllabus" title="View Detailed Syllabus" onclick="openSyllabusModal('${escapeHtml(course.courseCode)}')" aria-label="View syllabus">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
                <path d="M6 6h10"></path>
                <path d="M6 10h10"></path>
              </svg>
            </button>
            <button class="action-btn" title="Edit" onclick="openEditCourseModal(${course.courseId})" aria-label="Edit course">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
              </svg>
            </button>
            <button class="action-btn action-btn-danger" title="Delete" onclick="openDeleteCourseModal(${course.courseId})" aria-label="Delete course">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// =============================================================================
// Modals & Form Operations (Create & Update)
// =============================================================================

function openAddCourseModal() {
  state.currentEditId = null;
  elements.dialogTitle.textContent = 'Add New Course';
  elements.saveBtnText.textContent = 'Add Course';
  elements.courseForm.reset();
  elements.courseIdField.value = '';
  if (elements.prerequisite) elements.prerequisite.value = '';
  clearFormErrors();
  // Open with showModal() to activate top layer and backdrop
  elements.courseDialog.showModal();
}

window.openEditCourseModal = function(id) {
  const course = state.courses.find(c => c.courseId == id);
  if (!course) return;

  state.currentEditId = id;
  elements.dialogTitle.textContent = `Edit Course (#${id})`;
  elements.saveBtnText.textContent = 'Save Changes';
  clearFormErrors();

  elements.courseIdField.value = course.courseId;
  elements.courseCode.value = course.courseCode || '';
  elements.courseTitle.value = course.courseTitle || '';
  elements.courseCredit.value = course.courseCredit || 3.0;
  elements.courseType.value = course.courseType || 'Theory';
  elements.semesterOffered.value = course.semesterOffered || '1st';
  if (elements.deptName) {
    elements.deptName.value = course.deptName || '';
    if (!elements.deptName.value && course.deptName) {
      const target = course.deptName.toLowerCase();
      for (const opt of elements.deptName.options) {
        if (opt.value && (opt.value.toLowerCase() === target || opt.value.toLowerCase().includes(target) || target.includes(opt.value.toLowerCase()))) {
          elements.deptName.value = opt.value;
          break;
        }
      }
    }
  }
  elements.instructor.value = course.instructor || '';
  if (elements.prerequisite) elements.prerequisite.value = course.prerequisite || '';

  elements.courseDialog.showModal();
};

function clearFormErrors() {
  document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
}

async function handleFormSubmit(e) {
  e.preventDefault();
  clearFormErrors();

  const code = elements.courseCode.value.trim();
  const title = elements.courseTitle.value.trim();
  const credit = parseFloat(elements.courseCredit.value);
  const type = elements.courseType.value;
  const semester = elements.semesterOffered.value;
  const dept = elements.deptName.value.trim();
  const instructor = elements.instructor.value.trim();
  const prereq = elements.prerequisite ? elements.prerequisite.value.trim() : '';

  let hasError = false;

  if (!code) {
    document.getElementById('courseCodeError').textContent = 'Course code is required.';
    hasError = true;
  }
  if (!title) {
    document.getElementById('courseTitleError').textContent = 'Course title is required.';
    hasError = true;
  }
  if (isNaN(credit) || credit <= 0) {
    document.getElementById('courseCreditError').textContent = 'Enter a valid credit hour (> 0).';
    hasError = true;
  }
  if (!dept) {
    document.getElementById('deptNameError').textContent = 'Department is required.';
    hasError = true;
  }
  if (!instructor) {
    document.getElementById('instructorError').textContent = 'Instructor name is required.';
    hasError = true;
  }

  if (hasError) return;

  const payload = {
    courseCode: code,
    courseTitle: title,
    courseCredit: credit,
    courseType: type,
    semesterOffered: semester,
    deptName: dept,
    instructor: instructor,
    prerequisite: prereq
  };

  elements.saveBtnSpinner.classList.remove('hidden');
  elements.saveCourseBtn.disabled = true;

  try {
    if (state.currentEditId) {
      // UPDATE (PUT /api/courses/{id})
      const response = await fetch(`/api/courses/${state.currentEditId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        showToast('Course updated successfully!', 'success');
      } else {
        throw new Error('Failed to update course on server');
      }
    } else {
      // CREATE (POST /api/courses)
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        showToast('Course added successfully!', 'success');
      } else {
        throw new Error('Failed to add course on server');
      }
    }

    elements.courseDialog.close();
    await fetchCourses();
  } catch (error) {
    console.error('API Error:', error);
    // Offline / Demo fallback handling
    if (!state.isApiConnected) {
      if (state.currentEditId) {
        const index = state.courses.findIndex(c => c.courseId == state.currentEditId);
        if (index !== -1) {
          state.courses[index] = { ...state.courses[index], ...payload };
          showToast('Updated locally (Demo Mode)', 'success');
        }
      } else {
        const newId = Math.max(...state.courses.map(c => c.courseId), 100) + 1;
        state.courses.push({ courseId: newId, ...payload });
        showToast('Added locally (Demo Mode)', 'success');
      }
      elements.courseDialog.close();
      populateDepartmentOptions();
      applyFilters();
    } else {
      showToast(error.message || 'Operation failed', 'error');
    }
  } finally {
    elements.saveBtnSpinner.classList.add('hidden');
    elements.saveCourseBtn.disabled = false;
  }
}

// =============================================================================
// Delete Confirmation
// =============================================================================

window.openDeleteCourseModal = function(id) {
  const course = state.courses.find(c => c.courseId == id);
  if (!course) return;

  state.deleteTargetId = id;
  elements.deleteCourseTarget.innerHTML = `
    <div><strong>${escapeHtml(course.courseCode)}:</strong> ${escapeHtml(course.courseTitle)}</div>
    <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Dept: ${escapeHtml(course.deptName)} | Instructor: ${escapeHtml(course.instructor)}</div>
  `;
  elements.deleteDialog.showModal();
};

async function handleConfirmDelete() {
  if (!state.deleteTargetId) return;

  elements.deleteBtnSpinner.classList.remove('hidden');
  elements.confirmDeleteBtn.disabled = true;

  try {
    const response = await fetch(`/api/courses/${state.deleteTargetId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      showToast('Course deleted successfully.', 'success');
    } else {
      throw new Error('Failed to delete course');
    }

    elements.deleteDialog.close();
    await fetchCourses();
  } catch (error) {
    console.error('Delete Error:', error);
    if (!state.isApiConnected) {
      state.courses = state.courses.filter(c => c.courseId != state.deleteTargetId);
      showToast('Deleted locally (Demo Mode)', 'success');
      elements.deleteDialog.close();
      populateDepartmentOptions();
      applyFilters();
    } else {
      showToast('Error deleting course from server.', 'error');
    }
  } finally {
    elements.deleteBtnSpinner.classList.add('hidden');
    elements.confirmDeleteBtn.disabled = false;
    state.deleteTargetId = null;
  }
}

// =============================================================================
// Toast Notifications & Helpers
// =============================================================================

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
  } else {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--info)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <span>${escapeHtml(message)}</span>
  `;

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// =============================================================================
// Detailed Course Syllabus Modal & Segmentation Handlers
// =============================================================================

function setupSyllabusEvents() {
  if (elements.closeSyllabusDialogBtn) {
    elements.closeSyllabusDialogBtn.addEventListener('click', () => {
      elements.syllabusDialog.close();
    });
  }
  if (elements.closeSyllabusBottomBtn) {
    elements.closeSyllabusBottomBtn.addEventListener('click', () => {
      elements.syllabusDialog.close();
    });
  }

  // Syllabus Tab Navigation
  const tabBtns = document.querySelectorAll('.syl-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTabId = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.syl-tab-pane').forEach(pane => {
        pane.classList.remove('active');
        pane.classList.add('hidden');
      });

      btn.classList.add('active');
      const targetPane = document.getElementById(targetTabId);
      if (targetPane) {
        targetPane.classList.remove('hidden');
        targetPane.classList.add('active');
      }
    });
  });
}

async function fetchSyllabusDetails() {
  try {
    const res = await fetch('data/cse_syllabus_details.json').catch(() => fetch('/data/cse_syllabus_details.json'));
    if (res && res.ok) {
      state.syllabusData = await res.json();
      console.log(`Loaded detailed syllabus data for ${Object.keys(state.syllabusData).length} courses.`);
    } else {
      // Fallback to serverless API
      const apiRes = await fetch('/api/syllabus').catch(() => null);
      if (apiRes && apiRes.ok) {
        state.syllabusData = await apiRes.json();
      }
    }
  } catch (err) {
    console.warn('Could not load pre-extracted syllabus catalog:', err);
  }
}

window.openSyllabusModal = function(courseCode) {
  const code = (courseCode || '').trim();
  const course = state.courses.find(c => (c.courseCode || '').toUpperCase() === code.toUpperCase()) || {
    courseCode: code,
    courseTitle: code,
    courseCredit: 3.0,
    courseType: 'Theory',
    deptName: 'Computer Science and Engineering (CSE)'
  };

  const syl = (state.syllabusData && state.syllabusData[code]) || generateDefaultSyllabus(course);

  // Set Modal Header Badges & Title
  if (elements.sylCourseCode) elements.sylCourseCode.textContent = syl.courseCode || course.courseCode || 'N/A';
  if (elements.sylCourseType) elements.sylCourseType.textContent = syl.type || course.courseType || 'Theory';
  if (elements.sylCreditHours) elements.sylCreditHours.textContent = `${syl.creditHours || course.courseCredit} CRH`;

  if (elements.sylPrereqBadge) {
    if (syl.prerequisite && syl.prerequisite !== 'None') {
      elements.sylPrereqBadge.textContent = `Prereq: ${syl.prerequisite}`;
      elements.sylPrereqBadge.classList.remove('hidden');
    } else {
      elements.sylPrereqBadge.classList.add('hidden');
    }
  }

  if (elements.syllabusDialogTitle) {
    elements.syllabusDialogTitle.textContent = syl.courseTitle || course.courseTitle || 'Course Syllabus';
  }

  // Reset Tab Selection to Overview & Rationale
  const tabBtns = document.querySelectorAll('.syl-tab-btn');
  tabBtns.forEach(b => b.classList.remove('active'));
  if (tabBtns[0]) tabBtns[0].classList.add('active');

  document.querySelectorAll('.syl-tab-pane').forEach(pane => {
    pane.classList.remove('active');
    pane.classList.add('hidden');
  });
  const overviewPane = document.getElementById('syl-tab-overview');
  if (overviewPane) {
    overviewPane.classList.remove('hidden');
    overviewPane.classList.add('active');
  }

  // 1. Overview & Rationale Pane
  if (elements.sylRationale) {
    elements.sylRationale.textContent = syl.courseRationale || 'Provides structured theoretical and practical principles according to the IIUC OBE Curriculum.';
  }

  if (elements.sylObjectives) {
    if (syl.objectives && syl.objectives.length > 0) {
      elements.sylObjectives.innerHTML = syl.objectives.map(obj => `<li>${escapeHtml(obj)}</li>`).join('');
    } else {
      elements.sylObjectives.innerHTML = `
        <li>Understand the theoretical principles and mathematical underpinnings of ${escapeHtml(course.courseTitle || 'the course')}.</li>
        <li>Apply systematic engineering methodologies and modern software tools to solve practical computational problems.</li>
        <li>Analyze design trade-offs, evaluate performance, and synthesize efficient solutions.</li>
      `;
    }
  }

  if (elements.sylMetaGrid) {
    elements.sylMetaGrid.innerHTML = `
      <div style="background:var(--bg-card); padding:0.75rem 1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
        <span style="color:var(--text-muted); display:block; font-size:0.75rem; text-transform:uppercase;">Contact Hours</span>
        <strong style="color:var(--text-primary); font-size:0.95rem;">${syl.contactHours || 3} Hours / Week</strong>
      </div>
      <div style="background:var(--bg-card); padding:0.75rem 1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
        <span style="color:var(--text-muted); display:block; font-size:0.75rem; text-transform:uppercase;">Course Type</span>
        <strong style="color:var(--text-primary); font-size:0.95rem;">${escapeHtml(syl.type || course.courseType || 'Core')}</strong>
      </div>
      <div style="background:var(--bg-card); padding:0.75rem 1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
        <span style="color:var(--text-muted); display:block; font-size:0.75rem; text-transform:uppercase;">Prerequisite</span>
        <strong style="color:var(--text-primary); font-size:0.95rem;">${escapeHtml(syl.prerequisite || 'None')}</strong>
      </div>
      <div style="background:var(--bg-card); padding:0.75rem 1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
        <span style="color:var(--text-muted); display:block; font-size:0.75rem; text-transform:uppercase;">Co-Requisite</span>
        <strong style="color:var(--text-primary); font-size:0.95rem;">${escapeHtml(syl.coRequisite || 'None')}</strong>
      </div>
    `;
  }

  // 2. CLOs & Outcomes Pane
  if (elements.sylClosTableBody) {
    if (syl.clos && syl.clos.length > 0) {
      elements.sylClosTableBody.innerHTML = syl.clos.map(clo => `
        <tr>
          <td style="font-weight: 700; color: var(--primary); font-family: var(--font-mono);">${escapeHtml(clo.clo)}</td>
          <td>${escapeHtml(clo.description)}</td>
          <td><span class="badge badge-dept">${escapeHtml(clo.weightage || '25%')}</span></td>
        </tr>
      `).join('');
    } else {
      elements.sylClosTableBody.innerHTML = `
        <tr>
          <td style="font-weight: 700; color: var(--primary); font-family: var(--font-mono);">CLO1</td>
          <td>Demonstrate comprehensive knowledge and understanding of foundational concepts, paradigms, and mathematical models.</td>
          <td><span class="badge badge-dept">30%</span></td>
        </tr>
        <tr>
          <td style="font-weight: 700; color: var(--primary); font-family: var(--font-mono);">CLO2</td>
          <td>Apply algorithmic, architectural, and design principles to formulate structured engineering solutions.</td>
          <td><span class="badge badge-dept">40%</span></td>
        </tr>
        <tr>
          <td style="font-weight: 700; color: var(--primary); font-family: var(--font-mono);">CLO3</td>
          <td>Analyze edge scenarios, test performance metrics, and conduct systematic verification.</td>
          <td><span class="badge badge-dept">30%</span></td>
        </tr>
      `;
    }
  }

  // 3. Midterm Content (Section-A, 30 Marks)
  if (elements.sylMidtermList) {
    if (syl.midtermContent && syl.midtermContent.length > 0) {
      elements.sylMidtermList.innerHTML = syl.midtermContent.map((item, idx) => `
        <div class="syl-timeline-item">
          <div class="syl-timeline-topic">
            <span style="color:var(--primary); font-weight:700; margin-right:6px;">Week ${idx * 2 + 1}-${idx * 2 + 2}:</span>
            ${escapeHtml(item.topic)}
          </div>
          <div class="syl-timeline-meta">
            <span>${escapeHtml(item.duration || '2 weeks')}</span>
            ${item.clos ? `<span class="badge badge-prereq">${escapeHtml(item.clos)}</span>` : ''}
          </div>
        </div>
      `).join('');
    } else {
      elements.sylMidtermList.innerHTML = `
        <div class="syl-timeline-item">
          <div class="syl-timeline-topic">
            <span style="color:var(--primary); font-weight:700; margin-right:6px;">Weeks 1-3:</span>
            Foundations, terminology, architectural overview, and core mathematical principles of ${escapeHtml(course.courseTitle || 'the course')}.
          </div>
          <div class="syl-timeline-meta"><span>3 weeks</span><span class="badge badge-prereq">CLO1</span></div>
        </div>
        <div class="syl-timeline-item">
          <div class="syl-timeline-topic">
            <span style="color:var(--primary); font-weight:700; margin-right:6px;">Weeks 4-7:</span>
            Intermediate models, core algorithms, procedural execution, and midterm assessment preparation.
          </div>
          <div class="syl-timeline-meta"><span>4 weeks</span><span class="badge badge-prereq">CLO1, CLO2</span></div>
        </div>
      `;
    }
  }

  // 4. Final Exam Content (Section-B, 50 Marks)
  if (elements.sylFinalList) {
    if (syl.finalContent && syl.finalContent.length > 0) {
      elements.sylFinalList.innerHTML = syl.finalContent.map(item => `
        <div class="syl-timeline-item">
          <div class="syl-timeline-topic">
            ${item.group ? `<span class="badge badge-dept" style="margin-right: 8px;">${escapeHtml(item.group)}</span>` : ''}
            ${escapeHtml(item.topic)}
          </div>
          <div class="syl-timeline-meta">
            <span>${escapeHtml(item.duration || '2 weeks')}</span>
            ${item.clos ? `<span class="badge badge-prereq">${escapeHtml(item.clos)}</span>` : ''}
          </div>
        </div>
      `).join('');
    } else {
      elements.sylFinalList.innerHTML = `
        <div class="syl-timeline-item">
          <div class="syl-timeline-topic">
            <span class="badge badge-dept" style="margin-right: 8px;">Group-A</span>
            Advanced theoretical paradigms, optimization techniques, and systematic analysis (Weeks 8-10).
          </div>
          <div class="syl-timeline-meta"><span>3 weeks</span><span class="badge badge-prereq">CLO2</span></div>
        </div>
        <div class="syl-timeline-item">
          <div class="syl-timeline-topic">
            <span class="badge badge-dept" style="margin-right: 8px;">Group-B</span>
            Industrial applications, real-world case studies, system synthesis, and final review (Weeks 11-14).
          </div>
          <div class="syl-timeline-meta"><span>4 weeks</span><span class="badge badge-prereq">CLO2, CLO3</span></div>
        </div>
      `;
    }
  }

  // 5. Textbooks & References
  if (elements.sylTextbooksList) {
    if (syl.textbooks && syl.textbooks.length > 0) {
      elements.sylTextbooksList.innerHTML = syl.textbooks.map(bk => `
        <div class="book-card">
          <div class="book-title">📘 ${escapeHtml(bk.title)}</div>
          <div class="book-author">${escapeHtml(bk.authors || '')} ${bk.edition ? `(${escapeHtml(bk.edition)})` : ''}</div>
          <div class="book-isbn">${bk.publisher ? escapeHtml(bk.publisher) + (bk.year ? ', ' + bk.year : '') : ''} ${bk.isbn ? ' | ISBN: ' + escapeHtml(bk.isbn) : ''}</div>
        </div>
      `).join('');
    } else {
      elements.sylTextbooksList.innerHTML = `
        <div class="book-card">
          <div class="book-title">📘 Standard Text for ${escapeHtml(course.courseTitle || 'Curriculum')}</div>
          <div class="book-author">Department of Computer Science and Engineering, IIUC</div>
          <div class="book-isbn">Recommended textbook as approved by the Academic Council</div>
        </div>
      `;
    }
  }

  if (elements.sylReferenceBooksList) {
    if (syl.referenceBooks && syl.referenceBooks.length > 0) {
      elements.sylReferenceBooksList.innerHTML = syl.referenceBooks.map(bk => `
        <div class="book-card">
          <div class="book-title">📗 ${escapeHtml(bk.title)}</div>
          <div class="book-author">${escapeHtml(bk.authors || '')} ${bk.edition ? `(${escapeHtml(bk.edition)})` : ''}</div>
          <div class="book-isbn">${bk.publisher ? escapeHtml(bk.publisher) + (bk.year ? ', ' + bk.year : '') : ''}</div>
        </div>
      `).join('');
    } else {
      elements.sylReferenceBooksList.innerHTML = `
        <div class="book-card">
          <div class="book-title">📗 Academic Journals and Monograph References</div>
          <div class="book-author">Selected research papers, IEEE/ACM conference proceedings, and laboratory manuals</div>
          <div class="book-isbn">Available at the IIUC Central Library & Digital Repository</div>
        </div>
      `;
    }
  }

  // 6. Marks Breakdown (OBE CIE & SEE Standard)
  if (elements.sylMarksContainer) {
    const marks = syl.marksDistribution || {
      cie: { attendance: 10, classTestAssignment: 10, midterm: 30, total: 50 },
      see: { writtenExam: 50, total: 50 }
    };

    const cieDetails = marks.cie || {};
    const seeDetails = marks.see || {};

    elements.sylMarksContainer.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        <div style="background: var(--bg-card); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); border-top: 4px solid #0284c7;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <h4 style="font-weight: 700; color: #0284c7; font-size: 1rem;">Continuous Internal Evaluation (CIE)</h4>
            <span class="badge badge-midterm" style="font-size: 0.85rem; font-weight: 700;">50% Marks</span>
          </div>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.85rem;">Evaluated continuously throughout the 14-week semester:</p>
          <ul style="list-style: none; padding: 0; font-size: 0.875rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.5rem;">
            <li style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding-bottom: 4px;">
              <span>• Class Attendance & Participation:</span>
              <strong style="color: var(--text-primary); font-family: var(--font-mono);">${cieDetails.attendance || 10} Marks</strong>
            </li>
            <li style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding-bottom: 4px;">
              <span>• Class Tests / Quizzes / Assignments:</span>
              <strong style="color: var(--text-primary); font-family: var(--font-mono);">${cieDetails.classTestAssignment || cieDetails.labAssignments || 10} Marks</strong>
            </li>
            <li style="display: flex; justify-content: space-between; padding-bottom: 2px;">
              <span>• Mid-Term Examination (90 Minutes):</span>
              <strong style="color: var(--text-primary); font-family: var(--font-mono);">${cieDetails.midterm || cieDetails.midtermLab || 30} Marks</strong>
            </li>
          </ul>
        </div>

        <div style="background: var(--bg-card); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); border-top: 4px solid #10b981;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <h4 style="font-weight: 700; color: #10b981; font-size: 1rem;">Semester End Examination (SEE)</h4>
            <span class="badge badge-final" style="font-size: 0.85rem; font-weight: 700;">50% Marks</span>
          </div>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.85rem;">Comprehensive final examination at semester end:</p>
          <ul style="list-style: none; padding: 0; font-size: 0.875rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.5rem;">
            <li style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding-bottom: 4px;">
              <span>• Section-A (Midterm Topics):</span>
              <strong style="color: var(--text-primary); font-family: var(--font-mono);">15 Marks</strong>
            </li>
            <li style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding-bottom: 4px;">
              <span>• Section-B (Final Term Topics):</span>
              <strong style="color: var(--text-primary); font-family: var(--font-mono);">35 Marks</strong>
            </li>
            <li style="display: flex; justify-content: space-between; padding-bottom: 2px;">
              <span>• Total Examination Weight:</span>
              <strong style="color: var(--text-primary); font-family: var(--font-mono);">${seeDetails.writtenExam || seeDetails.finalLabExam || 50} Marks</strong>
            </li>
          </ul>
        </div>
      </div>
    `;
  }

  // Open the modal using modern HTML5 <dialog> showModal()
  elements.syllabusDialog.showModal();
};

function generateDefaultSyllabus(course) {
  const isLab = (course.courseType || '').toLowerCase() === 'lab';
  const crh = course.courseCredit || (isLab ? 1.5 : 3.0);
  const contact = isLab ? 3 : Math.round(crh);

  return {
    courseCode: course.courseCode || 'N/A',
    courseTitle: course.courseTitle || 'Untitled Course',
    creditHours: crh,
    contactHours: contact,
    type: `${course.courseType || 'Core'}, Engineering`,
    prerequisite: course.prerequisite || 'None',
    coRequisite: isLab ? (course.courseCode.replace(/2$/, '1') + ' Theory') : 'None',
    courseRationale: `Provides in-depth coverage of theoretical foundations, systematic models, and real-world practical applications for ${course.courseTitle || 'the course'} within the ${course.deptName || 'IIUC Academic'} curriculum.`,
    objectives: [
      `Master the core principles, conceptual paradigms, and technical terminology of ${course.courseTitle || 'this subject'}.`,
      `Develop analytical and problem-solving skills to formulate, model, and execute engineering designs.`,
      `Evaluate operational trade-offs, conduct experiments, and synthesize robust solutions adhering to modern quality standards.`
    ],
    clos: [
      { clo: "CLO1", description: `Demonstrate comprehensive knowledge and understanding of foundational theories and core concepts in ${course.courseTitle || 'the domain'}.`, weightage: "30%" },
      { clo: "CLO2", description: `Apply structured algorithms, design methodologies, and tools to solve domain-specific problems.`, weightage: "45%" },
      { clo: "CLO3", description: `Analyze experimental results, verify system behaviors, and communicate findings effectively.`, weightage: "25%" }
    ],
    midtermContent: [
      { topic: `Introduction to ${course.courseTitle || 'the discipline'}: Historical background, scope, basic terminology, and foundational frameworks.`, duration: "2 weeks", clos: "CLO1" },
      { topic: "Core Principles and Analytical Models: Formulations, mathematical representations, and baseline configurations.", duration: "2 weeks", clos: "CLO1, CLO2" },
      { topic: "Intermediate Problem-Solving: Applied techniques, case exercises, and mid-semester assessment preparation.", duration: "3 weeks", clos: "CLO2" }
    ],
    finalContent: [
      { group: "Group-A", topic: "Advanced Architectures and Methodologies: Optimization, performance modeling, and multi-component interactions.", duration: "3 weeks", clos: "CLO2" },
      { group: "Group-B", topic: "Integration, Emerging Trends, and Industrial Standards: Security considerations, current industry frameworks, and best practices.", duration: "2 weeks", clos: "CLO2, CLO3" },
      { group: "Group-B", topic: "Comprehensive Synthesis and System Review: Case studies, capstone evaluations, and final examination synthesis.", duration: "2 weeks", clos: "CLO3" }
    ],
    marksDistribution: isLab ? {
      cie: { attendance: 10, labAssignments: 20, midtermLab: 20, total: 50 },
      see: { finalLabExam: 50, total: 50 }
    } : {
      cie: { attendance: 10, classTestAssignment: 10, midterm: 30, total: 50 },
      see: { writtenExam: 50, total: 50 }
    },
    textbooks: [
      { authors: "Authoritative Academic Committee", title: `Principles of ${course.courseTitle || 'Engineering Studies'}`, edition: "Latest Edition", publisher: "IIUC Academic Press", year: "2024" }
    ],
    referenceBooks: [
      { authors: "International Academic Consortium", title: `Advanced Topics in ${course.courseTitle || 'Computer Studies'}`, edition: "Standard Reference", publisher: "Global Engineering Series", year: "2023" }
    ]
  };
}

