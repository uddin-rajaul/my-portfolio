"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export default function PythonAutomationPost() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-6">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {["Python", "Automation", "Data Processing"].map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Python for Automation and Data Processing
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              December 2025
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              6 min read
            </span>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Python has become my go-to tool for automation and data processing tasks. 
            At work, I use it for data validation, transformation, and small automation 
            scripts that support our cloud-based workflows.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Data Validation Scripts
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            One common task is validating data before it gets processed or stored. 
            Here&apos;s a pattern I use for structured data validation:
          </p>

          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`from typing import Dict, List, Any
from dataclasses import dataclass

@dataclass
class ValidationResult:
    is_valid: bool
    errors: List[str]

def validate_user_data(data: Dict[str, Any]) -> ValidationResult:
    """Validate user data before database insertion."""
    errors = []
    
    # Required field checks
    required_fields = ['email', 'name', 'user_id']
    for field in required_fields:
        if field not in data or not data[field]:
            errors.append(f"Missing required field: {field}")
    
    # Email format validation
    if 'email' in data and '@' not in str(data['email']):
        errors.append("Invalid email format")
    
    # Type validation
    if 'user_id' in data and not isinstance(data['user_id'], int):
        errors.append("user_id must be an integer")
    
    return ValidationResult(
        is_valid=len(errors) == 0,
        errors=errors
    )`}</code>
            </pre>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Using dataclasses and type hints makes the code more maintainable and 
            helps catch issues during development. This approach aligns with OOP 
            principles I&apos;ve learned and applied in my projects.
          </p>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Data Transformation
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Transforming data between different formats is essential when working 
            with APIs and databases. Here&apos;s how I approach it:
          </p>

          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`import json
from datetime import datetime
from typing import List, Dict

def transform_api_response(raw_data: List[Dict]) -> List[Dict]:
    """Transform API response to database-ready format."""
    transformed = []
    
    for record in raw_data:
        transformed.append({
            'id': record.get('externalId'),
            'created_at': parse_timestamp(record.get('timestamp')),
            'status': normalize_status(record.get('state')),
            'metadata': json.dumps(record.get('extra', {}))
        })
    
    return transformed

def parse_timestamp(ts: str) -> datetime:
    """Parse various timestamp formats."""
    formats = [
        '%Y-%m-%dT%H:%M:%SZ',
        '%Y-%m-%d %H:%M:%S',
        '%Y/%m/%d'
    ]
    for fmt in formats:
        try:
            return datetime.strptime(ts, fmt)
        except ValueError:
            continue
    return datetime.now()

def normalize_status(status: str) -> str:
    """Normalize status values from different sources."""
    status_map = {
        'active': 'active',
        'ACTIVE': 'active',
        'enabled': 'active',
        'inactive': 'inactive',
        'INACTIVE': 'inactive',
        'disabled': 'inactive'
    }
    return status_map.get(status, 'unknown')`}</code>
            </pre>
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Automation with Clean Code Principles
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            From my E-Commerce API project and production work, I&apos;ve learned 
            the importance of writing modular, testable code. Here&apos;s an automation 
            script that follows these principles:
          </p>

          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`class DataProcessor:
    """Process and validate data from multiple sources."""
    
    def __init__(self, config: dict):
        self.config = config
        self.processed_count = 0
        self.error_count = 0
    
    def process_batch(self, records: List[Dict]) -> Dict:
        """Process a batch of records with error handling."""
        results = {
            'successful': [],
            'failed': []
        }
        
        for record in records:
            try:
                validated = self._validate(record)
                transformed = self._transform(validated)
                results['successful'].append(transformed)
                self.processed_count += 1
            except Exception as e:
                results['failed'].append({
                    'record': record,
                    'error': str(e)
                })
                self.error_count += 1
        
        return results
    
    def _validate(self, record: Dict) -> Dict:
        """Validate a single record."""
        # Validation logic here
        return record
    
    def _transform(self, record: Dict) -> Dict:
        """Transform a single record."""
        # Transformation logic here
        return record
    
    def get_stats(self) -> Dict:
        """Return processing statistics."""
        return {
            'processed': self.processed_count,
            'errors': self.error_count,
            'success_rate': self.processed_count / 
                (self.processed_count + self.error_count) * 100
                if (self.processed_count + self.error_count) > 0 
                else 0
        }`}</code>
            </pre>
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Connecting to Cloud Services
          </h2>

          <p className="text-muted-foreground leading-relaxed mb-6">
            At Gorkhali Agents, I work with Google Cloud services. Here&apos;s a 
            pattern for securely accessing data using Secret Manager:
          </p>

          <div className="bg-zinc-900 rounded-lg p-4 mb-6 overflow-x-auto">
            <pre className="text-sm">
              <code>{`from google.cloud import secretmanager
import os

def get_secret(secret_id: str, project_id: str = None) -> str:
    """Retrieve a secret from Google Cloud Secret Manager."""
    project_id = project_id or os.environ.get('GCP_PROJECT')
    
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{project_id}/secrets/{secret_id}/versions/latest"
    
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")

# Usage
db_password = get_secret("database-password")`}</code>
            </pre>
          </div>

          <h2 className="text-2xl font-semibold mt-12 mb-4">
            Key Takeaways
          </h2>

          <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
            <li>
              <strong className="text-foreground">Type hints matter:</strong> They 
              catch bugs early and make code self-documenting
            </li>
            <li>
              <strong className="text-foreground">OOP for organization:</strong> Classes 
              help organize related functionality
            </li>
            <li>
              <strong className="text-foreground">Error handling is crucial:</strong> In 
              production, always expect and handle failures
            </li>
            <li>
              <strong className="text-foreground">Security first:</strong> Never hardcode 
              credentials, use secret managers
            </li>
          </ul>

          <p className="text-muted-foreground leading-relaxed">
            These Python skills form the foundation for ETL development, where data 
            validation, transformation, and reliable processing are essential.
          </p>
        </motion.div>
      </article>
    </main>
  );
}
