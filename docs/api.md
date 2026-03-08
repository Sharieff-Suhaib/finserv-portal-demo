# FinServ Portal API

## Issues

### GET /api/issues

Returns all issues.

**Response:**

```json
{
  "items": [
    {
      "id": 1,
      "title": "Payment processing timeout",
      "status": "open",
      "priority": "high"
    }
  ]
}
```

> **Note:** This endpoint serves the full list of issues.

---

## Customers

### GET /api/customers/:id

Returns customer details by ID.

**Response:**

```json
{
  "id": "C001",
  "name": "Acme Financial Corp",
  "tier": "enterprise"
}
```
