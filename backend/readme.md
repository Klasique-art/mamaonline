# MamaOnline Platform Backend Documentation

## Overview

This document provides a comprehensive guide to the backend implementation of our e-commerce platform. The backend is built using Django and Django REST Framework, with additional features like real-time notifications using Django Channels and user authentication with dj-rest-auth.

## Tech Stack

- Django
- Django REST Framework
- Django Channels (for real-time notifications)
- dj-rest-auth (for authentication)
- django-filter (for advanced filtering)

## Models

The following models have been implemented:

1. Category
2. Product
3. Order
4. OrderItem
5. Review
6. Message

## API Endpoints

Base URL: `http://localhost:8000/api/` (adjust according to your deployment)

### Authentication Endpoints

- Registration: POST `/auth/registration/`
- Login: POST `/auth/login/`
- Logout: POST `/auth/logout/`
- Password Reset: POST `/auth/password/reset/`
- Password Reset Confirm: POST `/auth/password/reset/confirm/`

### Category Endpoints

- List and Create: GET, POST `/categories/`
- Retrieve, Update, Delete: GET, PUT, PATCH, DELETE `/categories/{id}/`

### Product Endpoints

- List and Create: GET, POST `/products/`
- Retrieve, Update, Delete: GET, PUT, PATCH, DELETE `/products/{id}/`
- Approve Product (Admin only): POST `/products/{id}/approve/`

### Order Endpoints

- List and Create: GET, POST `/orders/`
- Retrieve, Update, Delete: GET, PUT, PATCH, DELETE `/orders/{id}/`

### Review Endpoints

- List and Create: GET, POST `/reviews/`
- Retrieve, Update, Delete: GET, PUT, PATCH, DELETE `/reviews/{id}/`

### Message Endpoints

- List and Create: GET, POST `/messages/`
- Retrieve, Update, Delete: GET, PUT, PATCH, DELETE `/messages/{id}/`
- List Unread Messages: GET `/messages/unread/`
- Mark Message as Read: POST `/messages/{id}/mark_as_read/`

## Detailed Endpoint Descriptions

### Products

1. **List Products**
   - URL: GET `/products/`
   - Description: Returns a list of all approved products.
   - Query Parameters:
     - `category`: Filter by category ID
     - `seller`: Filter by seller ID
     - `search`: Search in name and description
     - `ordering`: Order by price or created_at (use '-' for descending)

2. **Create Product**
   - URL: POST `/products/`
   - Description: Create a new product (requires authentication).
   - Fields:
     - name (string, required)
     - description (string)
     - price (decimal, required)
     - category (integer, category ID, required)
     - image (file upload)

3. **Retrieve Product**
   - URL: GET `/products/{id}/`
   - Description: Get details of a specific product.

4. **Update Product**
   - URL: PUT/PATCH `/products/{id}/`
   - Description: Update a product (seller or admin only).

5. **Delete Product**
   - URL: DELETE `/products/{id}/`
   - Description: Delete a product (seller or admin only).

6. **Approve Product**
   - URL: POST `/products/{id}/approve/`
   - Description: Approve a product (admin only).

### Orders

1. **List Orders**
   - URL: GET `/orders/`
   - Description: List all orders for the authenticated user.

2. **Create Order**
   - URL: POST `/orders/`
   - Description: Create a new order.
   - Fields:
     - products (array of objects, each containing product ID and quantity)
     - payment_method (string: 'CASH', 'CARD', or 'MOBILE')

3. **Retrieve Order**
   - URL: GET `/orders/{id}/`
   - Description: Get details of a specific order.

4. **Update Order**
   - URL: PUT/PATCH `/orders/{id}/`
   - Description: Update an order (admin only).

### Reviews

1. **List Reviews**
   - URL: GET `/reviews/`
   - Description: List all reviews.

2. **Create Review**
   - URL: POST `/reviews/`
   - Description: Create a new review.
   - Fields:
     - product (integer, product ID)
     - rating (integer, 1-5)
     - comment (string)

### Messages

1. **List Messages**
   - URL: GET `/messages/`
   - Description: List all messages for the authenticated user.

2. **Send Message**
   - URL: POST `/messages/`
   - Description: Send a new message.
   - Fields:
     - receiver (integer, user ID)
     - content (string)

3. **List Unread Messages**
   - URL: GET `/messages/unread/`
   - Description: List all unread messages for the authenticated user.

4. **Mark Message as Read**
   - URL: POST `/messages/{id}/mark_as_read/`
   - Description: Mark a specific message as read.

## Real-time Notifications

