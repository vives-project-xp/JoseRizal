# Environment Configuration

## Database Configuration

The Jose Rizal project uses PostgreSQL as its database system. The database connection is configured through environment variables stored in the `.env` file and through the Docker Compose configuration.

### Environment Variables

The project uses the following environment variables for database configuration:

```properties
POSTGRES_DB="jose_rizal"    # Database name
POSTGRES_USER="jose_rizal"  # Database username
POSTGRES_PASSWORD="admin"   # Database password (this is a secret)
AUTH_SECRET="admin"         # Authentication secret key
#! See .env
```

### Docker Configuration

As of May 2025, the database service is automatically configured in the `compose.yaml` file with the following settings:

```yaml
database:
  container_name: postgres
  image: postgres:17.4
  restart: always
  environment:
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: postgres
    POSTGRES_DB: joserizal
  volumes:
    - postgres_data:/var/lib/postgresql/data
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U postgres -d joserizal"]
    interval: 2s
    retries: 10
```

The backend service connects to the database using the following connection string:

```
DATABASE_URL: postgresql://postgres:postgres@database:5432/joserizal
```

### Important Notes

1. **Automated Configuration**: The database is automatically configured when you start the application using Docker Compose. No manual setup is required.

2. **Default Credentials**: 
   - Username: `postgres`
   - Password: `postgres`
   - Database: `joserizal`

3. **Environment Variable Precedence**: The hardcoded values in `compose.yaml` take precedence over the values in the `.env` file.

4. **pgAdmin Access**: A pgAdmin container is included for database management:
   - URL: http://localhost:5050
   - Login email: admin@pgadmin.com
   - Password: pgadmin
   
   To connect to your database using pgAdmin:
   - Host: database
   - Port: 5432
   - Username: postgres
   - Password: postgres
   - Database: joserizal

5. **Security Considerations**: 
   - The current configuration uses default credentials suitable for development.
   - For production deployment, use strong, unique passwords.
   - Consider using a secrets management solution instead of storing credentials in environment variables.

## Connecting to the Database

### From Backend Application

The backend application connects to the database using the `DATABASE_URL` environment variable:

```python
# Example usage in Python/FastAPI
from sqlalchemy import create_engine
from os import getenv

DATABASE_URL = getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
```

### From Command Line

You can connect to the database directly using the PostgreSQL client inside the container:

```bash
docker exec -it postgres psql -U postgres -d joserizal
```

## Modifying Database Configuration

If you need to modify the database configuration:

1. Update the values in `compose.yaml` under the `database` service.
2. Rebuild the containers with `docker compose up --build`.

For any changes to take effect, you may need to remove the existing volumes:

```bash
docker compose down -v
docker compose up --build
```