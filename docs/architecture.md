# Nova Salud Architecture

## System Overview

Nova Salud is built on a modular client-server architecture.

- Frontend: React + Vite + Tailwind, responsible for user interaction, dashboards, responsive workflows, and real-time notifications.
- Backend: Node.js + Express + PostgreSQL + Sequelize, responsible for secure API endpoints, business logic, inventory synchronization, sales processing, and alert generation.
- Realtime layer: Socket.io for live inventory and alert updates.

## High-level Components

- Authentication & Security
- User Management
- Inventory Management
- Sales Management
- Customer Management
- Supplier Management
- Reporting & Analytics
- Notification System

## ER Diagram

```mermaid
erDiagram
    ROLE ||--o{ USER : has
    CATEGORY ||--o{ PRODUCT : contains
    SUPPLIER ||--o{ PRODUCT : supplies
    PRODUCT ||--o{ SALE_DETAIL : included_in
    SALE ||--o{ SALE_DETAIL : has
    CUSTOMER ||--o{ SALE : purchases
    PRODUCT ||--o{ INVENTORY_MOVEMENT : tracks
    SUPPLIER ||--o{ PURCHASE : orders
    ALERT ||--|| PRODUCT : references

    ROLE {
      int id PK
      string name
      json permissions
    }
    USER {
      uuid id PK
      string full_name
      string email
      string password
      int role_id FK
    }
    CATEGORY {
      int id PK
      string name
      string description
    }
    PRODUCT {
      uuid id PK
      string name
      string barcode
      decimal price
      int stock
      int min_stock
      date expiration_date
      int supplier_id FK
      int category_id FK
    }
    CUSTOMER {
      uuid id PK
      string full_name
      string email
      string phone
      int loyalty_points
    }
    SALE {
      uuid id PK
      string invoice_number
      decimal total
      string payment_method
      string status
      string cashier_name
      uuid customer_id FK
    }
    SALE_DETAIL {
      int id PK
      uuid sale_id FK
      uuid product_id FK
      int quantity
      decimal unit_price
    }
    INVENTORY_MOVEMENT {
      int id PK
      uuid product_id FK
      int quantity
      string type
    }
    PURCHASE {
      int id PK
      string purchase_number
      int supplier_id FK
      decimal total
    }
    ALERT {
      int id PK
      string type
      text message
      boolean read
    }
```

## Sequence Flow

1. User logs in through `/api/auth/login`
2. Frontend stores JWT and requests protected resources
3. Sales creation updates product stock and inventory movements
4. Critical stock or expiry triggers alerts
5. Dashboard requests summary stats from `/api/reports/dashboard`

## Deployment Notes

- Use Docker Compose locally for PostgreSQL, backend, and frontend.
- Production deployment should use managed PostgreSQL, HTTPS termination, CI/CD pipelines, and secret management for JWT keys.
