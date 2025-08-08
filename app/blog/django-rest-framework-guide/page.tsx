import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Simple Guide to Django REST Framework - Rajaul Uddin",
  description:
    "A practical guide to building REST APIs with Django REST Framework, covering serializers, viewsets, and authentication.",
}

export default function DjangoRESTFrameworkGuide() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-12 transition-colors">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:opacity-80 mb-8 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
          {/* Hero Image */}
          <div className="w-full h-64 bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl font-bold mb-2">Simple Guide to Django REST Framework</h1>
              <p className="text-emerald-100">Building robust APIs with Python and Django</p>
            </div>
          </div>

          <div className="p-8">
            {/* Meta Info */}
            <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400 text-sm mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>October 25, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>7 min read</span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Django REST Framework (DRF) is my go-to choice for building robust APIs in Python. It provides powerful
                tools while maintaining Django's philosophy of "batteries included." Here's a practical guide based on
                real project experience.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                Serializers: The Heart of DRF
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Serializers handle data validation and transformation. Here's a practical example:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
  price_display = serializers.SerializerMethodField()
  
  class Meta:
      model = Product
      fields = ['id', 'name', 'price', 'price_display', 'category']
      read_only_fields = ['id']
  
  def get_price_display(self, obj):
      return f"$${obj.price:.2f}"
  
  def validate_price(self, value):
      if value <= 0:
          raise serializers.ValidationError("Price must be positive")
      return value`}
              </pre>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                SerializerMethodField and custom validation methods provide flexibility for complex business logic.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                ViewSets for CRUD Operations
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                ViewSets provide a clean way to handle standard CRUD operations:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

class ProductViewSet(viewsets.ModelViewSet):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer
  filter_backends = [DjangoFilterBackend, filters.SearchFilter]
  filterset_fields = ['category', 'is_active']
  search_fields = ['name', 'description']
  
  @action(detail=True, methods=['post'])
  def set_featured(self, request, pk=None):
      product = self.get_object()
      product.is_featured = True
      product.save()
      return Response({'status': 'featured set'})`}
              </pre>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Custom actions extend the standard CRUD operations with business-specific endpoints.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
                Authentication & Permissions
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                DRF provides flexible authentication options. Here's a token-based setup:
              </p>

              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto mb-8">
                {`# settings.py
REST_FRAMEWORK = {
  'DEFAULT_AUTHENTICATION_CLASSES': [
      'rest_framework.authentication.TokenAuthentication',
  ],
  'DEFAULT_PERMISSION_CLASSES': [
      'rest_framework.permissions.IsAuthenticated',
  ],
}

# Custom permission
from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
      if request.method in permissions.SAFE_METHODS:
          return True
      return obj.owner == request.user`}
              </pre>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Custom permissions give you fine-grained control over who can access what.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">Best Practices</h2>

              <ul className="text-gray-600 dark:text-gray-300 space-y-2 mb-8">
                <li>Use different serializers for input and output when needed</li>
                <li>Implement proper pagination for list endpoints</li>
                <li>Add comprehensive error handling and logging</li>
                <li>Use Django's built-in caching for expensive operations</li>
                <li>Document your API with tools like drf-spectacular</li>
              </ul>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                DRF's power lies in its flexibility and Django integration. These patterns have helped me build
                maintainable APIs that scale with business requirements.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
