# Security Architecture & Threat Model
## CampusSphere // Unified Student Utilities & Hyperlocal Campus Navigation

**Security Framework:** STRIDE Threat Modeling & Zero Trust Architecture  
**Regulatory Compliance:** Digital Personal Data Protection Act (DPDPA 2023) & ISO/IEC 27001  

---

## 1. STRIDE Threat Model & Countermeasures

```mermaid
flowchart TD
    subgraph STRIDE["Threat Vectors & Mitigations"]
        T1["Spoofing: Fake QR Pass Injection"] --> M1["HMAC-SHA256 Cryptographic Pass Signing"]
        T2["Tampering: Extending 30-Min Hold TTL"] --> M2["Immutable Server-Side Redis Expire Enforcer"]
        T3["Repudiation: Denying Library Booking"] --> M3["Append-Only Turnstile Audit Log"]
        T4["Information Disclosure: PII Leak"] --> M4["Roll Number Hashing & Minimal Token Scope"]
        T5["Denial of Service: Bulk Seat Hoarding"] --> M5["Rate Limiter (Max 1 Active Hold per Student)"]
        T6["Elevation of Privilege: Admin Panel Tampering"] --> M6["RBAC Claims Verification & Scoped JWTs"]
    end
```

| STRIDE Category | Threat Description | Severity | CampusSphere Countermeasure |
| :--- | :--- | :--- | :--- |
| **Spoofing** | Student creates fabricated QR image to breach library turnstile. | **Critical** | Dynamic QR payload signed with HMAC-SHA256 using server master key; expires every 60 seconds. |
| **Tampering** | User alters API request to extend 30-minute hold to 4 hours. | **High** | TTL is exclusively tracked server-side in Redis; client countdown is purely presentation. |
| **Repudiation** | User denies reserving pod or generating 50-page print spools. | **Medium** | Immutable timestamped audit trails logged with institutional roll number and terminal IP. |
| **Info Disclosure** | Student names and roll numbers intercepted on campus Wi-Fi. | **High** | Enforced TLS 1.3 encryption on all transit corridors; PII stripped from client telemetry streams. |
| **Denial of Service** | Malicious bot script reserves all 24 library desks simultaneously. | **Critical** | Rate limiting: strictly 1 active hold per roll number; IP rate limits via token bucket (5 req/min). |
| **Elevation of Priv**| Student attempts to edit RO plant diagnostics or printer configurations.| **High** | Strict Role-Based Access Control (RBAC) enforcing signed JWT claims for facility admin scopes. |

---

## 2. Role-Based Access Control (RBAC) Matrix

```mermaid
classDiagram
    class Permissions {
        +view_map()
        +book_library_pod()
        +spool_print_job()
        +view_water_telemetry()
        +resolve_advisory_ticket()
        +override_seat_lock()
    }

    class Student {
        +view_map(): true
        +book_library_pod(): true (Rate Limited)
        +spool_print_job(): true
        +view_water_telemetry(): true
        +resolve_advisory_ticket(): false
        +override_seat_lock(): false
    }

    class Faculty {
        +view_map(): true
        +book_library_pod(): true (Priority Wing)
        +spool_print_job(): true (Priority Queue)
        +view_water_telemetry(): true
        +resolve_advisory_ticket(): false
        +override_seat_lock(): false
    }

    class FacilityAdmin {
        +view_map(): true
        +book_library_pod(): true
        +spool_print_job(): true
        +view_water_telemetry(): true
        +resolve_advisory_ticket(): true
        +override_seat_lock(): true
    }

    class Visitor {
        +view_map(): true
        +book_library_pod(): false
        +spool_print_job(): false
        +view_water_telemetry(): true
        +resolve_advisory_ticket(): false
        +override_seat_lock(): false
    }

    Permissions <|-- Student
    Permissions <|-- Faculty
    Permissions <|-- FacilityAdmin
    Permissions <|-- Visitor
```

---

## 3. Cryptographic Verification of the 30-Minute Library Pass

To prevent screenshot sharing or forged turnstile passes:
1. When a hold is granted, the backend generates an ephemeral token payload:
   $$\text{Token} = \text{SeatID} \parallel \text{RollNumber} \parallel \text{Timestamp} \parallel \text{Nonce}$$
2. The payload is signed with a secret key:
   $$\text{Signature} = \text{HMAC-SHA256}(\text{Token}, K_{\text{secret}})$$
3. The turnstile scanner decodes the QR code, recalculates the HMAC signature, verifies that $\text{CurrentTime} - \text{Timestamp} \le 1800\text{ seconds}$, and queries Redis to ensure the seat is not expired.

```mermaid
sequenceDiagram
    autonumber
    actor Turnstile as Physical Scanner
    participant Edge as Turnstile Controller
    participant Engine as Security Daemon
    participant Redis as Redis Auth Cache

    Turnstile->>Edge: Read QR Code Payload
    Edge->>Engine: Send (Payload, Signature)
    Engine->>Engine: Recompute HMAC-SHA256(Payload, K_secret)
    
    alt Signature Matches & Time < 1800s
        Engine->>Redis: Check key "lock:desk:B-04"
        Redis-->>Engine: Key Active (CS-2024-042)
        Engine-->>Edge: ACCESS GRANTED (Unlock Turnstile Gate)
        Edge-->>Turnstile: Trigger Green LED & Solenoid Release
    else Invalid Signature or Expired
        Engine-->>Edge: ACCESS DENIED (Expired / Invalid Token)
        Edge-->>Turnstile: Trigger Red Buzzer & Keep Gate Locked
    end
```
