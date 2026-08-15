const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const projectDetails = {
  "travel-booking": {
    title: "Agentic AI Travel Booking Platform",
    domain: "Travel",
    points: [
      "Architected and built an <strong>Agentic AI-powered conversational travel platform</strong> enabling natural-language search and booking workflows across Flights, Hotels, Buses, and Cars.",
      "Designed a <strong>multi-agent orchestration</strong> workflow with Router, Planner, Clarification, Personalization, and Policy Agents for intent classification, task planning, tool selection, and multi-turn conversations.",
      "Implemented <strong>LLM-driven entity extraction and slot filling</strong> to capture travel parameters and dynamically invoke REST API tools/function calls for real-time travel search and filtering.",
      "Created <strong>MongoDB-backed conversational memory and state management</strong> for context retention, booking history, user preferences, and personalized recommendations across multi-turn interactions.",
      "Integrated <strong>OAuth-secured APIs, RBAC, guardrails, asynchronous processing, and WebSocket streaming</strong>, and deployed the containerized application on AWS ECS Fargate with automated CI/CD pipelines.",
      "<strong>Tech Stack:</strong> Python, FastAPI, LangChain, Google Gemini, Agentic AI, LLM, WebSockets, MongoDB, OAuth 1.0, Docker, AWS ECS Fargate, AWS SSM, Azure DevOps, CI/CD",
    ],
  },
  "document-intelligence": {
    title: "AI-Powered Travel Document Intelligence & Extraction",
    domain: "Travel",
    points: [
      "<strong>Sole AI Engineer</strong> responsible for designing and developing an end-to-end <strong>GenAI-powered document intelligence system</strong> to classify and extract structured booking data from PDFs, images, and GDS text across Flight, Hotel, Bus, Train, Car, Visa, Insurance, Holiday, Event, and Activity documents.",
      "Built a <strong>multimodal LLM pipeline using Gemini 2.5 Flash</strong>, combining document classification, prompt-based information extraction, JSON output validation, and schema transformation to convert heterogeneous travel documents into standardized booking data.",
      "Implemented <strong>FastAPI REST APIs</strong> with <strong>Pydantic-based schema validation</strong> to enforce structured LLM outputs, validate field types and required attributes, reject malformed extraction responses, and measure extraction quality through an evaluation framework.",
      "Productionized the solution using <strong>Docker, AWS ECS, AWS SSM Parameter Store, and Azure DevOps CI/CD</strong>, supporting secure configuration and automated deployment across environments.",
      "<strong>Tech Stack:</strong> Python, FastAPI, Pydantic, Gemini 2.5 Flash, Multimodal LLMs, Prompt Engineering, Generative AI, REST APIs, JSON, Docker, AWS ECS, AWS SSM, CI/CD",
    ],
  },
  "hr-rag": {
    title: "Multimodal HR RAG Chatbot",
    domain: "HR",
    points: [
      "Built a <strong>production-ready multimodal RAG chatbot</strong> for HR training by integrating <strong>Azure OpenAI</strong> with proprietary HR data across PDFs, PPTs, Word documents, tables, images, case studies, and policy guidelines.",
      "Designed an <strong>asynchronous document ingestion pipeline</strong> using Unstructured, Azure Service Bus, Azure Container Apps Jobs, Azure Blob Storage, and PostgreSQL, with document versioning, SHA-256 based change detection.",
      "Implemented <strong>hybrid retrieval with Azure AI Search</strong>, combining vector similarity, BM25 keyword search, semantic reranking, and metadata-based authorization filters to retrieve the correct policy version based on tenant, role, country, and employee type.",
      "Secured the GenAI workflow using <strong>NVIDIA NeMo Guardrails, Microsoft Presidio, Pydantic validation, RBAC, OAuth/OIDC, and Azure API Management as an AI Gateway</strong> for prompt-injection protection, PII redaction, citation validation, model governance, rate limiting, token control, and secure Azure OpenAI access.",
      "Implemented end-to-end <strong>LLM observability, traceability, and explainability</strong> using OpenTelemetry and Langfuse, tracing ingestion, retrieval, model calls, token usage, latency, guardrail decisions, citations, and responses back to the exact source document, version, and page.",
      "<strong>Tech Stack:</strong> Python, FastAPI, LangChain, Azure OpenAI, Azure AI Search, Unstructured, Azure Blob Storage, PostgreSQL, Azure Service Bus, Azure Container Apps, Azure API Management, NVIDIA NeMo Guardrails, Microsoft Presidio, Pydantic, OAuth/OIDC, Azure Key Vault, RBAC, OpenTelemetry, Langfuse",
    ],
  },
  ingenero: {
    title: "Ingenero Digitization",
    domain: "Petrochemical",
    points: [
      "Delivered <strong>end-to-end Machine Learning and Predictive Analytics solutions</strong> for chemical reactor optimization, including reactor output forecasting, plant efficiency prediction, and soft-sensor models for estimating missing or unavailable sensor measurements.",
      "Built production-ready ML pipelines covering <strong>data preprocessing, feature engineering, model training, hyperparameter tuning, validation, and performance evaluation</strong> on historical and real-time process data.",
      "Created AI-powered virtual engineering and what-if simulation modules to help process engineers evaluate operating conditions and optimize critical KPIs such as yield, conversion rate, energy efficiency, and reactor stability.",
      "Integrated trained models with <strong>real-time monitoring dashboards and automated inference pipelines</strong>, enabling continuous tracking of sensor parameters, predicted KPIs, and early identification of process deviations; automated model deployment through Azure DevOps CI/CD.",
      "<strong>Tech Stack:</strong> Python, Pandas, NumPy, Scikit-learn, Machine Learning, Predictive Analytics, Regression, Time Series, Feature Engineering, Model Evaluation, MLOps",
    ],
  },
  "banner-defect": {
    title: "Banner Defect Classification",
    domain: "Logistics",
    points: [
      "Built a <strong>Computer Vision-based automated quality inspection system</strong> using <strong>Convolutional Neural Networks (CNN) and ResNet</strong> to classify banners as acceptable or defective based on visual quality.",
      "Created an end-to-end <strong>image preprocessing and deep learning training pipeline</strong> using labeled image datasets to identify defects such as wrinkles, tears, and printing defects, achieving approximately 95% classification accuracy.",
      "Applied <strong>data augmentation, transfer learning, model validation, and performance evaluation</strong> to improve model generalization and robustness across varying banner images and defect patterns.",
      "Deployed the trained model for automated visual inspection and inference, reducing manual inspection effort and enabling faster identification of defective banners during the quality-control process.",
      "<strong>Tech Stack:</strong> Python, TensorFlow/Keras, CNN, ResNet, Transfer Learning, Computer Vision, Deep Learning, Image Classification, Image Preprocessing, Data Augmentation, Model Evaluation",
    ],
  },
};

const projectCards = document.querySelectorAll("[data-project]");
const projectModal = document.querySelector("[data-project-modal]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalDomain = document.querySelector("[data-modal-domain]");
const modalPoints = document.querySelector("[data-modal-points]");
const modalCloseControls = document.querySelectorAll("[data-modal-close]");
let lastFocusedProject = null;
let lockedScrollY = 0;

const openProjectModal = (projectKey) => {
  const detail = projectDetails[projectKey];
  if (!detail || !projectModal || !modalTitle || !modalDomain || !modalPoints) return;

  lastFocusedProject = document.activeElement;
  modalTitle.textContent = detail.title;
  modalDomain.textContent = detail.domain;
  modalPoints.innerHTML = detail.points.map((point) => `<li>${point}</li>`).join("");
  projectModal.hidden = false;
  requestAnimationFrame(() => projectModal.classList.add("is-open"));
  projectModal.setAttribute("aria-hidden", "false");
  lockedScrollY = window.scrollY;
  document.documentElement.classList.add("modal-open");
  document.body.classList.add("modal-open");
  document.body.style.top = `-${lockedScrollY}px`;
  projectModal.querySelector(".project-modal__close")?.focus();
};

const closeProjectModal = () => {
  if (!projectModal) return;

  const restoreScrollY = lockedScrollY;
  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
  document.documentElement.classList.remove("modal-open");
  document.body.classList.remove("modal-open");
  document.body.style.top = "";
  window.scrollTo(0, restoreScrollY);
  window.setTimeout(() => {
    if (!projectModal.classList.contains("is-open")) projectModal.hidden = true;
  }, 180);
  if (lastFocusedProject instanceof HTMLElement) {
    lastFocusedProject.focus({ preventScroll: true });
  }
};

projectCards.forEach((card) => {
  card.addEventListener("click", () => openProjectModal(card.dataset.project));
  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openProjectModal(card.dataset.project);
  });
});

modalCloseControls.forEach((control) => control.addEventListener("click", closeProjectModal));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal?.classList.contains("is-open")) closeProjectModal();
});

const counters = document.querySelectorAll("[data-count]");
const formatter = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 });

const animateCounter = (element) => {
  const target = Number(element.getAttribute("data-count"));
  const suffix = element.getAttribute("data-suffix") || "";
  const start = performance.now();
  const duration = 1100;

  const tick = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${formatter.format(target * eased)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const revealElements = document.querySelectorAll(".reveal, .reveal-item");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.12,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

const revealVisibleNow = () => {
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
      element.classList.add("is-visible");
      revealObserver.unobserve(element);
    }
  });
};

window.addEventListener("hashchange", () => requestAnimationFrame(revealVisibleNow));
window.addEventListener("load", revealVisibleNow);
