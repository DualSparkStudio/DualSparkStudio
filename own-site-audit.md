# Own-Site Audit: DualSpark Studio

**Audit Date:** 2026-11-07  
**Live Site URL:** `https://dualsparkstudio.com`  
**Local Source Directory:** `c:\work\DualSparkStudio`  
**Audit Scope:** Read-only audit against user-provided Answer Key.  

---

## Answer Key (Ground Truth Baseline)

The following baseline parameters override any conflicting data found on the live website or in local source files:

| Attribute | Answer Key Value |
| :--- | :--- |
| **Legal / Brand Name** | DualSpark Studio |
| **Business Structure** | Partnership firm |
| **Partners** | Yash Vilas Karanjule & Sahil Ramchandra Dhanawade |
| **Location / Model** | Remote; based in Pune, Maharashtra; serving clients everywhere |
| **Phone & WhatsApp** | `9270269875` (dedicated for both voice call and WhatsApp) |
| **Primary Email** | `dualsparkstudio@gmail.com` |
| **General Scope of Work** | All kinds of website and software development |
| **Specialized Experience** | More experience in resort booking websites |
| **Key Platform Credential** | Backend engineering for the **Lead Hunter Club** platform |
| **Official GitHub** | `https://github.com/DualSparkStudio` |
| **Primary Domain** | `dualsparkstudio.com` |

---

## 1. Live Site Fetch & Route Audit

### 1.1 Exact Commands & Raw Server Responses

#### Route: `/` (Homepage)
* **Exact Command:**
  ```powershell
  curl.exe -s -L -i https://dualsparkstudio.com/
  ```
* **Raw Headers Output:**
  ```http
  HTTP/1.1 200 OK
  Date: Sat, 07 Nov 2026 10:35:22 GMT
  Content-Type: text/html; charset=UTF-8
  Transfer-Encoding: chunked
  Connection: keep-alive
  Age: 1
  Cache-Control: public,max-age=0,must-revalidate
  cache-status: "Netlify Edge"; fwd=miss; fwd-status=200; stored
  Server: cloudflare
  strict-transport-security: max-age=31536000
  ```
* **Raw Meta Tags Extracted:**
  - `<title>`:
    ```html
    <title>DualSpark Studio | Custom Web Development, Software &amp; 3D Experiences</title>
    ```
    *(Local Source: `client/index.html`, Line 8)*
  - `<meta name="description">`:
    ```html
    <meta name="description" content="DualSpark Studio crafts high-performance custom websites, bespoke software, hotel &amp; villa booking systems, and immersive 3D interactive web experiences engineered for business growth."/>
    ```
    *(Local Source: `client/index.html`, Line 10)*
  - `<link rel="canonical">`:
    ```html
    <link rel="canonical" href="https://dualsparkstudio.com/"/>
    ```
    *(Local Source: `client/index.html`, Line 16)*
* **Label:** `[VERIFIED]`

---

#### Route: `/contact-only`
* **Exact Command:**
  ```powershell
  curl.exe -s -L -i https://dualsparkstudio.com/contact-only
  ```
* **Raw Headers Output:**
  ```http
  HTTP/1.1 200 OK
  Date: Sat, 07 Nov 2026 10:36:36 GMT
  Content-Type: text/html; charset=UTF-8
  Transfer-Encoding: chunked
  Connection: keep-alive
  Age: 0
  Cache-Control: public,max-age=0,must-revalidate
  cache-status: "Netlify Edge"; fwd=miss; fwd-status=200; stored
  Server: cloudflare
  ```
* **Raw Meta Tags Extracted:**
  - `<title>`:
    ```html
    <title>DualSpark Studio | Custom Web Development, Software &amp; 3D Experiences</title>
    ```
    *(Local Source: `client/index.html`, Line 8)*
  - `<meta name="description">`:
    ```html
    <meta name="description" content="DualSpark Studio crafts high-performance custom websites, bespoke software, hotel &amp; villa booking systems, and immersive 3D interactive web experiences engineered for business growth."/>
    ```
    *(Local Source: `client/index.html`, Line 10)*
  - `<link rel="canonical">`:
    ```html
    <link rel="canonical" href="https://dualsparkstudio.com/"/>
    ```
    *(Local Source: `client/index.html`, Line 16)*
* **Label:** `[VERIFIED]`

---

#### Route: `/testing`
* **Exact Command:**
  ```powershell
  curl.exe -s -L -i https://dualsparkstudio.com/testing
  ```
* **Raw Headers Output:**
  ```http
  HTTP/1.1 200 OK
  Date: Sat, 07 Nov 2026 10:44:15 GMT
  Content-Type: text/html; charset=UTF-8
  Transfer-Encoding: chunked
  Connection: keep-alive
  Age: 0
  Cache-Control: public,max-age=0,must-revalidate
  cache-status: "Netlify Edge"; fwd=miss; fwd-status=200; stored
  Server: cloudflare
  ```
* **Raw Meta Tags Extracted:**
  - `<title>`:
    ```html
    <title>DualSpark Studio | Custom Web Development, Software &amp; 3D Experiences</title>
    ```
    *(Local Source: `client/index.html`, Line 8)*
  - `<meta name="description">`:
    ```html
    <meta name="description" content="DualSpark Studio crafts high-performance custom websites, bespoke software, hotel &amp; villa booking systems, and immersive 3D interactive web experiences engineered for business growth."/>
    ```
    *(Local Source: `client/index.html`, Line 10)*
  - `<link rel="canonical">`:
    ```html
    <link rel="canonical" href="https://dualsparkstudio.com/"/>
    ```
    *(Local Source: `client/index.html`, Line 16)*
* **Label:** `[VERIFIED]`

---

#### Route: `/admin`
* **Exact Command:**
  ```powershell
  curl.exe -s -L -i https://dualsparkstudio.com/admin
  ```
* **Raw Headers Output:**
  ```http
  HTTP/1.1 200 OK
  Date: Sat, 07 Nov 2026 10:46:50 GMT
  Content-Type: text/html; charset=UTF-8
  Transfer-Encoding: chunked
  Connection: keep-alive
  Age: 1
  Cache-Control: public,max-age=0,must-revalidate
  cache-status: "Netlify Edge"; fwd=miss; fwd-status=200; stored
  Server: cloudflare
  ```
* **Raw Meta Tags Extracted:**
  - `<title>`:
    ```html
    <title>DualSpark Studio | Custom Web Development, Software &amp; 3D Experiences</title>
    ```
    *(Local Source: `client/index.html`, Line 8)*
  - `<meta name="description">`:
    ```html
    <meta name="description" content="DualSpark Studio crafts high-performance custom websites, bespoke software, hotel &amp; villa booking systems, and immersive 3D interactive web experiences engineered for business growth."/>
    ```
    *(Local Source: `client/index.html`, Line 10)*
  - `<link rel="canonical">`:
    ```html
    <link rel="canonical" href="https://dualsparkstudio.com/"/>
    ```
    *(Local Source: `client/index.html`, Line 16)*
* **Label:** `[VERIFIED]`

---

### 1.2 Evaluation: Is Main Content in Raw HTML Without JavaScript?

* **Raw HTML Body Payload Across All Routes:**
  ```html
  <body>
    <div id="root"></div>
  </body>
  ```
* **Finding:**
  - **Who I am:** Absent from raw HTML.
  - **What I do:** Absent from raw HTML visible body (partial text exists only inside a `<script type="application/ld+json">` tag).
  - **Where:** Absent from raw HTML visible body.
  - **How to contact me:** Absent from raw HTML visible body.
* **Result:** **NO.** Because the application relies on client-side React Single Page Application (SPA) hydration, the raw server-rendered HTML delivers an empty `<div id="root"></div>`. Any crawler, scraper, or user browsing without executing JavaScript receives zero visible body content.
* **Label:** `[VERIFIED]`

---

## 2. JSON-LD Structured Data Audit

### 2.1 Raw JSON-LD Block on Live Site (`https://dualsparkstudio.com/`)
*(Local Source: `client/index.html`, Lines 48–127)*

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://dualsparkstudio.com/#organization",
      "name": "DualSpark Studio",
      "alternateName": "DualSparkStudio",
      "url": "https://dualsparkstudio.com/",
      "logo": "https://dualsparkstudio.com/logobw.png",
      "image": "https://dualsparkstudio.com/logo.png",
      "description": "DualSpark Studio is a digital engineering agency specializing in custom web development, bespoke software solutions, resort & villa booking websites, and 3D interactive web applications.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "412210",
        "addressCountry": "IN"
      },
      "telephone": "+91-9270269875",
      "email": "dualsparkstudio@gmail.com",
      "sameAs": [
        "https://www.linkedin.com/in/dualspark-studio-a50757363",
        "https://github.com/dualsparkstudio",
        "https://www.instagram.com/dualsparkstudio"
      ],
      "priceRange": "$$",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Web Development",
              "description": "High-performance, responsive websites built with modern frameworks and technical SEO."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Hospitality & Resort Booking Websites",
              "description": "Custom resort, villa, and hotel websites with integrated direct booking engines."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "3D Interactive Web Experiences",
              "description": "Interactive 3D configurators, WebGL product showcases, and spatial web applications."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Software & Cloud Architecture",
              "description": "Scalable web applications, backend APIs, and database engineering."
            }
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://dualsparkstudio.com/#website",
      "url": "https://dualsparkstudio.com/",
      "name": "DualSpark Studio",
      "description": "Custom Web Development, Software & 3D Interactive Experiences",
      "publisher": {
        "@id": "https://dualsparkstudio.com/#organization"
      }
    }
  ]
}
```

---

### 2.2 Raw JSON-LD Block in Local Docs Export
*(Local Source: `docs/index.html`, Lines 23–29)*

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DualSpark Studio",
  "url": "https://dualsparkstudio.com",
  "logo": "https://dualsparkstudio.com/logobw.png"
}
```

---

### 2.3 Raw JSON-LD Component Block in Client Runtime
*(Local Source: `client/src/components/Services.tsx`, Lines 228–278)*

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you build custom websites and direct booking systems for resorts, villas, and hotels?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We engineer bespoke hospitality websites with commission-free direct booking engines, interactive room and villa showcases, real-time availability calendars, and secure multi-currency payment gateway integrations designed to maximize guest conversions."
      }
    },
    {
      "@type": "Question",
      "name": "How do 3D interactive elements and WebGL benefit my website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Interactive 3D configurators, virtual spaces, and real-time WebGL models dramatically increase visitor dwell time, engagement, and customer trust by letting clients interact with products or spaces directly in their browser."
      }
    },
    {
      "@type": "Question",
      "name": "Can DualSpark Studio build custom business software and web applications?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. We build tailor-made SaaS platforms, customer portals, inventory and booking management tools, and scalable REST backends using React, TypeScript, Node.js, Express, and PostgreSQL."
      }
    },
    {
      "@type": "Question",
      "name": "How do you ensure fast mobile loading times while using 3D graphics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We use progressive enhancement: critical DOM and above-the-fold content render instantly, while heavy 3D canvases, shaders, and animations are code-split, deferred, and dynamically scaled down on mobile devices."
      }
    },
    {
      "@type": "Question",
      "name": "Where is DualSpark Studio located and what markets do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DualSpark Studio is based in Pune, Maharashtra, India, serving global clients across North America, Europe, Asia, and India seeking premium digital engineering and creative technology."
      }
    }
  ]
}
```

---

### 2.4 Comparison of JSON-LD Against Answer Key

| Field | In JSON-LD | In Answer Key | Status / Finding |
| :--- | :--- | :--- | :--- |
| **Name** | `"name": "DualSpark Studio"` | `DualSpark Studio` | **MATCH** `[VERIFIED]` |
| **Alternate Name** | `"alternateName": "DualSparkStudio"` | *(Not in key)* | **NOT IN KEY** `[VERIFIED]` |
| **Entity Type** | `@type: "ProfessionalService"` / `"Organization"` | `Partnership firm` | **MISMATCH** (No legal partnership declaration, no `legalName`) `[INFERRED]` |
| **Partners / Founders** | *(None listed in schema)* | `Yash Vilas Karanjule & Sahil Ramchandra Dhanawade` | **MISMATCH / ABSENT** `[VERIFIED]` |
| **URL** | `"url": "https://dualsparkstudio.com/"` | `dualsparkstudio.com` | **MATCH** `[VERIFIED]` |
| **Telephone** | `"telephone": "+91-9270269875"` | `9270269875 for both call and wp` | **PARTIAL MATCH** (Number matches; WhatsApp channel not declared) `[VERIFIED]` |
| **Email** | `"email": "dualsparkstudio@gmail.com"` | `dualsparkstudio@gmail.com` | **MATCH** `[VERIFIED]` |
| **Location Model** | `"addressLocality": "Pune"`, `"postalCode": "412210"` | `remote and based in pune and we saver all our everywhere` | **PARTIAL MISMATCH** (Specifies fixed postal code; does not state remote model or global service scope) `[VERIFIED]` |
| **sameAs Links** | `https://github.com/dualsparkstudio` | `https://github.com/DualSparkStudio` | **MATCH** (casing variation) `[VERIFIED]` |
| **sameAs Links** | `https://www.linkedin.com/in/dualspark-studio-a50757363` | *(Not in key)* | **NOT IN KEY** `[VERIFIED]` |
| **sameAs Links** | `https://www.instagram.com/dualsparkstudio` | *(Not in key)* | **NOT IN KEY** `[VERIFIED]` |
| **Key Platform Credential** | *(None listed)* | `backend for the Lead Hunter Club platform` | **MISMATCH / ABSENT** `[VERIFIED]` |

---

## 3. Site Claims Comparison Against Answer Key

### 3.1 Personal & Company Names

| Name Found on Site | Exact File & Line | Status vs Answer Key | Evidence Label |
| :--- | :--- | :--- | :--- |
| `DualSpark Studio` | `client/index.html:8`, `client/src/components/Layout.tsx:120-122` | Matches key | `[VERIFIED]` |
| `DualSparkStudio` | `client/src/components/Layout.tsx:217`, `docs/index.html:20` | Formatting variation | `[VERIFIED]` |
| `Yash Vilas Karanjule` | *(Entire codebase)* | **Absent from site** | `[VERIFIED]` |
| `Sahil Ramchandra Dhanawade` | *(Entire codebase)* | **Absent from site** | `[VERIFIED]` |
| `Partnership firm` | *(Entire codebase)* | **Absent from site** | `[VERIFIED]` |
| `Dr. Elena Vance` | `client/src/pages/Testing.tsx:624` | **Not in key** (Fictional persona) | `[VERIFIED]` |
| `Yash Sharma` | `client/src/pages/Testing.tsx:624` | **Mismatch** (Surname conflicts with Karanjule) | `[VERIFIED]` |
| `Dr. Julian Thorne` | `client/src/pages/Testing.tsx:114` | **Not in key** (Fictional commenter) | `[VERIFIED]` |
| `Maya Lin` | `client/src/pages/Testing.tsx:124` | **Not in key** (Fictional commenter) | `[VERIFIED]` |
| `Devon Patel` | `client/src/pages/Testing.tsx:134` | **Not in key** (Fictional commenter) | `[VERIFIED]` |
| `john@example.com` | `client/src/components/Contact.tsx:278` | **Not in key** (Placeholder string) | `[VERIFIED]` |

---

### 3.2 Telephone Numbers

| Phone Number Found on Site | Exact File & Line | Status vs Answer Key | Evidence Label |
| :--- | :--- | :--- | :--- |
| `+91-9270269875` | `client/index.html:68` | Matches key phone (`9270269875`) | `[VERIFIED]` |
| `919270269875` (WhatsApp) | `client/src/pages/ContactButtons.tsx:18` | Matches key WhatsApp | `[VERIFIED]` |
| `+91 7057150584` | `client/src/lib/constants.ts:50` | **Mismatch / Not in key** (Second unlisted phone number) | `[VERIFIED]` |
| `+91 7057150584` | `client/public/llms.txt:39` | **Mismatch / Not in key** (Second unlisted phone number) | `[VERIFIED]` |

---

### 3.3 Email Addresses

| Email Address Found on Site | Exact File & Line | Status vs Answer Key | Evidence Label |
| :--- | :--- | :--- | :--- |
| `dualsparkstudio@gmail.com` | `client/index.html:69` | Matches key email | `[VERIFIED]` |
| `dualsparkstudio@gmail.com` | `client/src/lib/constants.ts:49` | Matches key email | `[VERIFIED]` |
| `dualsparkstudio@gmail.com` | `client/public/llms.txt:38` | Matches key email | `[VERIFIED]` |
| `dualsparkstudio@gmail.com` | `client/src/components/Contact.tsx:153` | Matches key email | `[VERIFIED]` |
| `john@example.com` | `client/src/components/Contact.tsx:278` | **Not in key** (Input placeholder) | `[VERIFIED]` |

---

### 3.4 Town & Geographic Scope

| Location Data Found on Site | Exact File & Line | Status vs Answer Key | Evidence Label |
| :--- | :--- | :--- | :--- |
| `Pune` | `client/index.html:63`, `client/src/lib/constants.ts:52-53` | Matches key (`based in pune`) | `[VERIFIED]` |
| `Maharashtra` | `client/index.html:64`, `client/src/lib/constants.ts:54` | Matches key region | `[VERIFIED]` |
| `412210` (Postal Code) | `client/index.html:65`, `client/src/lib/constants.ts:55` | **Not in key** (Specific pincode unmentioned) | `[VERIFIED]` |
| `Remote` | *(Entire codebase)* | **Absent from site** (Site does not declare remote status) | `[VERIFIED]` |
| `Solutions for businesses worldwide` | `client/src/components/Hero.tsx:196` | Corresponds to `saver all our everywhere` | `[INFERRED]` |
| `serving global clients across North America, Europe, Asia, and India` | `client/src/components/Services.tsx:221`, `Services.tsx:272` | **Not in key** (Specific territories unmentioned in key) | `[VERIFIED]` |

---

### 3.5 Services & Portfolio Claims

| Service Claim Found on Site | Exact File & Line | Status vs Answer Key | Evidence Label |
| :--- | :--- | :--- | :--- |
| `Web Development + Software Solutions` | `client/src/components/Hero.tsx:70` | Matches key (`all kind of website and software development`) | `[VERIFIED]` |
| `Custom Web Development` | `client/src/components/Hero.tsx:165`, `client/src/lib/data.ts:77` | Matches key | `[VERIFIED]` |
| `Custom Software Solutions` | `client/src/components/Hero.tsx:175`, `client/src/lib/data.ts:130` | Matches key | `[VERIFIED]` |
| `Hospitality & Resort Booking Websites` | `client/index.html:92`, `client/public/llms.txt:8` | Matches key (`done more in resort booking websites`) | `[VERIFIED]` |
| `Lead Hunter Club` platform backend | *(Entire codebase)* | **Absent from site** (Zero mentions in code, pages, or metadata) | `[VERIFIED]` |
| `3D Interactive Web Experiences` / `Three.js` | `client/index.html:100`, `client/src/lib/data.ts:90` | **Not in key** | `[VERIFIED]` |
| `Mobile Applications` / `React Native` | `client/src/lib/data.ts:116` | **Not in key** | `[VERIFIED]` |
| `E-commerce Solutions` | `client/src/lib/data.ts:103` | **Not in key** | `[VERIFIED]` |
| `Database & Backend Solutions` | `client/src/lib/data.ts:143` | Matches key (`software development`) | `[INFERRED]` |
| `Answer Engine Optimization (AEO/GEO)` | `client/public/llms.txt:26` | **Not in key** | `[VERIFIED]` |

---

## 4. External Link Verification

Every external link discovered across `client/src`, `client/index.html`, `client/public`, and `index.html` was tested with `curl.exe` to record the exact HTTP response status code.

* **Exact Command Used:**
  ```powershell
  curl.exe -s -L -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" --max-time 10 <URL>
  ```

### Raw Test Results

| URL Tested | Source Location | HTTP Status Code | Analysis / Label |
| :--- | :--- | :--- | :--- |
| `https://github.com/dualsparkstudio` | `client/src/lib/constants.ts:42` | **200 OK** | Live active repository `[VERIFIED]` |
| `https://www.linkedin.com/in/dualspark-studio-a50757363` | `client/src/lib/constants.ts:43` | **999** | Blocked by LinkedIn bot mitigation `[VERIFIED]` |
| `https://www.instagram.com/dualsparkstudio` | `client/index.html:73` | **200 OK** | Live profile `[VERIFIED]` |
| `https://www.instagram.com/dualsparkstudio?igsh=MXhndG4xMHV3cHY4ZQ==` | `client/src/lib/constants.ts:44` | **200 OK** | Live profile with tracking query `[VERIFIED]` |
| `https://wa.me/919270269875` | `client/src/pages/ContactButtons.tsx:18` | **200 OK** | Live WhatsApp deep-link `[VERIFIED]` |
| `https://dualsparkstudio.github.io/showcase/` | `client/src/components/ModelLoader.tsx:28` | **200 OK** | GitHub Pages showcase asset `[VERIFIED]` |
| `https://www.khronos.org/registry/webgl/specs/latest/2.0/` | `client/src/pages/Testing.tsx:1888` | **200 OK** | Valid external specification `[VERIFIED]` |
| `https://fonts.googleapis.com` | `client/index.html:43` | **404 Not Found** | CDN host root returns 404 (pre-connect endpoint) `[VERIFIED]` |
| `https://fonts.gstatic.com` | `client/index.html:44` | **404 Not Found** | CDN host root returns 404 (pre-connect endpoint) `[VERIFIED]` |
| `https://example.com` | `client/src/lib/data.ts:12` | **200 OK** | IANA placeholder domain `[VERIFIED]` |
| `https://example.com/ecommerce` | `client/src/lib/data.ts:12` | **404 Not Found** | Broken project link `[VERIFIED]` |
| `https://example.com/dashboard` | `client/src/lib/data.ts:24` | **404 Not Found** | Broken project link `[VERIFIED]` |
| `https://example.com/virtual-event` | `client/src/lib/data.ts:35` | **404 Not Found** | Broken project link `[VERIFIED]` |
| `https://example.com/fitness-app` | `client/src/lib/data.ts:46` | **404 Not Found** | Broken project link `[VERIFIED]` |
| `https://example.com/architecture` | `client/src/lib/data.ts:57` | **404 Not Found** | Broken project link `[VERIFIED]` |
| `https://example.com/education` | `client/src/lib/data.ts:68` | **404 Not Found** | Broken project link `[VERIFIED]` |
| `https://github.com/example/ecommerce` | `client/src/lib/data.ts:13` | **404 Not Found** | Broken repository link `[VERIFIED]` |
| `https://github.com/example/dashboard` | `client/src/lib/data.ts:25` | **404 Not Found** | Broken repository link `[VERIFIED]` |
| `https://github.com/example/virtual-event` | `client/src/lib/data.ts:36` | **404 Not Found** | Broken repository link `[VERIFIED]` |
| `https://github.com/example/fitness-app` | `client/src/lib/data.ts:47` | **404 Not Found** | Broken repository link `[VERIFIED]` |
| `https://github.com/example/architecture` | `client/src/lib/data.ts:58` | **404 Not Found** | Broken repository link `[VERIFIED]` |
| `https://github.com/example/education` | `client/src/lib/data.ts:69` | **404 Not Found** | Broken repository link `[VERIFIED]` |
| `https://github.com/username/repo` | `client/src/pages/Testing.tsx:1288` | **404 Not Found** | Placeholder repository link `[VERIFIED]` |

---

## 5. robots.txt, sitemap.xml & AI Crawler Permissions

### 5.1 robots.txt Audit

* **Exact Command:**
  ```powershell
  curl.exe -s -i https://dualsparkstudio.com/robots.txt
  ```
* **Raw Server Output:**
  ```http
  HTTP/1.1 200 OK
  Date: Sat, 07 Nov 2026 10:44:40 GMT
  Content-Type: text/plain; charset=UTF-8
  Content-Length: 175
  Connection: keep-alive
  Cache-Control: public, max-age=14400, must-revalidate
  Server: cloudflare

  # DualSpark Studio - robots.txt
  User-agent: *
  Allow: /
  Disallow: /admin

  # Host
  Host: https://dualsparkstudio.com

  # Sitemaps
  Sitemap: https://dualsparkstudio.com/sitemap.xml
  ```
  *(Local Source: `client/public/robots.txt`, Lines 1–10)*

#### AI Crawler Blocking Assessment
- `GPTBot` (OpenAI): **NOT BLOCKED** (Allowed under `User-agent: *`, `/admin` disallowed). `[VERIFIED]`
- `PerplexityBot` (Perplexity AI): **NOT BLOCKED** (Allowed under `User-agent: *`, `/admin` disallowed). `[VERIFIED]`
- `ClaudeBot` (Anthropic): **NOT BLOCKED** (Allowed under `User-agent: *`, `/admin` disallowed). `[VERIFIED]`
- `Google-Extended` (Google Gemini): **NOT BLOCKED** (Allowed under `User-agent: *`, `/admin` disallowed). `[VERIFIED]`
- **Omission Finding:** No dedicated directives exist for AI crawlers, and `llms.txt` is not referenced within `robots.txt`. `[VERIFIED]`

---

### 5.2 sitemap.xml Audit

* **Exact Command:**
  ```powershell
  curl.exe -s -i https://dualsparkstudio.com/sitemap.xml
  ```
* **Raw Server Output:**
  ```http
  HTTP/1.1 200 OK
  Date: Sat, 07 Nov 2026 10:44:41 GMT
  Content-Type: application/xml
  Content-Length: 443
  Connection: keep-alive
  Cache-Control: public,max-age=0,must-revalidate
  Server: cloudflare

  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://dualsparkstudio.com/</loc>
      <lastmod>2026-10-16</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://dualsparkstudio.com/contact-only</loc>
      <lastmod>2026-10-16</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  </urlset>
  ```
  *(Local Source: `client/public/sitemap.xml`, Lines 1–15)*

#### Findings
- Routes indexed: 2 (`/`, `/contact-only`).
- Routes omitted: `/testing` (the 6,480-word research page), `/llms.txt`. `[VERIFIED]`
- Stated last modification date: `2026-10-16`. `[VERIFIED]`

---

## 6. Audit of Unbacked Claims, Guarantees & Fabricated Telemetry

The codebase contains numerous factual assertions, metrics, and academic claims lacking evidentiary support, empirical data, or verifiable client backing:

### 6.1 Unbacked Commercial Claims & Guarantees

1. **"guarantee green Core Web Vitals"**
   - *File & Line:* `client/src/components/Services.tsx:212`, `Services.tsx:264`
   - *Raw Text:* `"...dynamically scaled down on mobile devices (e.g., lower particle counts and disabled bloom post-processing) to guarantee green Core Web Vitals."`
   - *Finding:* Explicit guarantee without qualification or real-user telemetry SLA. `[VERIFIED]`

2. **"designed to maximize guest conversions"**
   - *File & Line:* `client/src/components/Services.tsx:186`, `Services.tsx:240`
   - *Raw Text:* `"...payment gateway integrations (Stripe, Razorpay, etc.) designed to maximize guest conversions."`
   - *Finding:* Conversion efficacy claim without baseline or case study data. `[VERIFIED]`

3. **"dramatically increase visitor dwell time, engagement, and customer trust"**
   - *File & Line:* `client/src/components/Services.tsx:194`, `Services.tsx:248`
   - *Raw Text:* `"...dramatically increase visitor dwell time, engagement, and customer trust."`
   - *Finding:* Psychological and statistical claim lacking supporting analytics or comparative study. `[VERIFIED]`

4. **"serving global clients across North America, Europe, Asia, and India"**
   - *File & Line:* `client/src/components/Services.tsx:221`, `Services.tsx:272`
   - *Raw Text:* `"...serving global clients across North America, Europe, Asia, and India seeking premium digital engineering..."`
   - *Finding:* Specific territory claim not verifiable from answer key or published client roster. `[VERIFIED]`

5. **"Answer Engine Optimization (AEO/GEO)" Service Claim**
   - *File & Line:* `client/public/llms.txt:26`
   - *Raw Text:* `"Comprehensive Schema.org JSON-LD structured data and Answer Engine Optimization (AEO/GEO)."`
   - *Finding:* Service capability claim unbacked by live verified client rankings. `[VERIFIED]`

---

### 6.2 Fabricated Academic & Research Credentials (`/testing`)

The entire testing whitepaper located at `client/src/pages/Testing.tsx` presents fictitious institutional affiliations, DOIs, and staff titles:

1. **Fabricated Digital Object Identifier (DOI)**
   - *File & Line:* `client/src/pages/Testing.tsx:312`, `Testing.tsx:592`
   - *Raw Text:* `DOI: 10.1145/dualspark.2026.09`
   - *Finding:* `10.1145` is the official DOI registrant prefix for the **Association for Computing Machinery (ACM)**. The paper has not been published in the ACM Digital Library. `[VERIFIED]`

2. **Fictitious Publisher & Technical Report Reference**
   - *File & Line:* `client/src/pages/Testing.tsx:311`, `Testing.tsx:1900`
   - *Raw Text:* `publisher={DualSpark Press}`, `DualSpark Systems Engineering Group. (2025). Contiguous Memory Layouts and Zero-Allocation Loops in V8. Technical Report DS-TR-2025-04.`
   - *Finding:* Fictitious academic publishing arm and unindexed technical report number. `[VERIFIED]`

3. **Fictitious Authors & Professional Titles**
   - *File & Line:* `client/src/pages/Testing.tsx:624`, `Testing.tsx:628–629`
   - *Raw Text:* `Dr. Elena Vance & Yash Sharma`, `Chief Graphics Architect & Systems Lead, DualSpark Studio Lab`
   - *Finding:* Neither partner from the answer key (Yash Vilas Karanjule, Sahil Ramchandra Dhanawade) is credited. Titles and personnel are fabricated. `[VERIFIED]`

4. **Hardcoded Social Proof & Telemetry Counters**
   - *File & Line:* `client/src/pages/Testing.tsx:80`, `Testing.tsx:91–94`
   - *Raw Text:*
     * `bookmarkCount: 348`
     * `helpful: 1482`
     * `rocket: 924`
     * `lightbulb: 615`
     * `mindblown: 489`
   - *Finding:* Static hardcoded integer state presented to users as live global reader engagement metrics. `[VERIFIED]`

5. **Fabricated Expert Commentary Thread**
   - *File & Line:* `client/src/pages/Testing.tsx:112–142`
   - *Raw Text:*
     * `Dr. Julian Thorne (Staff Graphics Engineer, Spatial Compute Labs)`
     * `Maya Lin (Principal Creative Technologist @ Studio Kroma)`
     * `Devon Patel (W3C WebGPU Community Contributor)`
   - *Finding:* Simulated peer reviews hardcoded directly in React component state. `[VERIFIED]`

6. **Unbacked Physical Hardware Stress Test Benchmarks**
   - *File & Line:* `client/src/pages/Testing.tsx:1618`, `Testing.tsx:395–462`
   - *Raw Text:* `"All benchmark data points represent 10-minute continuous stress sessions measured across physical silicon under standard ambient thermal conditions (22°C)..."`
   - *Finding:* Claims exact frame jitter (`2.14 ms`), VRAM usage (`38.4 MB`), and power draw (`2.8 W`) across Apple M3 Max, iPhone 15 Pro, Samsung Galaxy S24 Ultra, and Intel Celeron N4020 without attached raw telemetry log files. `[VERIFIED]`

---

### 6.3 Unbacked Portfolio Showcases

All 6 projects featured in the portfolio section are mock template entries:

| Project Title | Stated Description | Destination Link | Evidence Finding |
| :--- | :--- | :--- | :--- |
| **E-commerce Platform** | *"3D product visualization and AR try-on features"* | `https://example.com/ecommerce` | Fictional entry; 404 dead link `[VERIFIED]` |
| **Interactive Dashboard** | *"Real-time updates and interactive 3D charts"* | `https://example.com/dashboard` | Fictional entry; 404 dead link `[VERIFIED]` |
| **Virtual Event Platform** | *"Customizable avatars and networking features"* | `https://example.com/virtual-event` | Fictional entry; 404 dead link `[VERIFIED]` |
| **Mobile Fitness App** | *"3D exercise demonstrations and progress tracking"* | `https://example.com/fitness-app` | Fictional entry; 404 dead link `[VERIFIED]` |
| **Architectural Visualization** | *"3D architectural visualization tool for real estate"* | `https://example.com/architecture` | Fictional entry; 404 dead link `[VERIFIED]` |
| **Educational Platform** | *"3D models and simulations for STEM subjects"* | `https://example.com/education` | Fictional entry; 404 dead link `[VERIFIED]` |

* **Portfolio Discrepancy:** The actual verified specialization from the answer key (resort booking websites) and the actual platform backend credential (**Lead Hunter Club**) do not appear in any of the portfolio records. `[VERIFIED]`

---

## 7. Audit Summary Table

| Category | Finding | Evidence Level |
| :--- | :--- | :--- |
| **Live Route Fetching** | All routes (`/`, `/contact-only`, `/testing`, `/admin`) return identical headers, identical title, and identical canonical (`/`) | `[VERIFIED]` |
| **Raw HTML Rendering** | Empty `<div id="root"></div>`; main content requires JavaScript hydration to render | `[VERIFIED]` |
| **JSON-LD Name & Contact** | "DualSpark Studio", email `dualsparkstudio@gmail.com`, and phone `+91-9270269875` match key | `[VERIFIED]` |
| **JSON-LD Personnel** | Partners Yash Vilas Karanjule & Sahil Ramchandra Dhanawade absent from schema | `[VERIFIED]` |
| **JSON-LD Legal Structure** | Declared as `ProfessionalService`/`Organization`; partnership firm not declared | `[INFERRED]` |
| **Phones Found** | Key phone `9270269875` present; second phone `+91 7057150584` present on site but unlisted in key | `[VERIFIED]` |
| **Location Model** | Pune, Maharashtra present on site; "remote" model and "everywhere" scope unstated in code | `[VERIFIED]` |
| **Lead Hunter Club** | Zero occurrences in codebase | `[VERIFIED]` |
| **External Links** | 12 of 23 external project/repo URLs return HTTP 404; LinkedIn returns HTTP 999 anti-bot code | `[VERIFIED]` |
| **AI Crawlers** | GPTBot, PerplexityBot, ClaudeBot, Google-Extended are NOT blocked | `[VERIFIED]` |
| **Unbacked Claims** | Core Web Vitals guarantees, fake ACM DOI prefix, fake authors/commenters, hardcoded reaction metrics, mock portfolio | `[VERIFIED]` |

