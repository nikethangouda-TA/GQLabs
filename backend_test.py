#!/usr/bin/env python3
import requests
import json
import sys
from datetime import datetime

class GlideQuantumAPITester:
    def __init__(self, base_url="https://quantum-sales-demo.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_base = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        if headers is None:
            headers = {'Content-Type': 'application/json'}
        
        url = f"{self.api_base}{endpoint}"
        self.tests_run += 1
        
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=30)
            else:
                raise ValueError(f"Unsupported method: {method}")

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ PASSED - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ FAILED - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text}")

            self.test_results.append({
                'test_name': name,
                'endpoint': endpoint,
                'method': method,
                'expected_status': expected_status,
                'actual_status': response.status_code,
                'success': success,
                'response_preview': response.text[:200] if not success else 'OK'
            })

            return success, response.json() if success and response.content else {}

        except Exception as e:
            print(f"❌ FAILED - Error: {str(e)}")
            self.test_results.append({
                'test_name': name,
                'endpoint': endpoint,
                'method': method,
                'expected_status': expected_status,
                'actual_status': 'ERROR',
                'success': False,
                'response_preview': str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test GET /api/"""
        return self.run_test("Root API Endpoint", "GET", "/", 200)

    def test_get_config(self):
        """Test GET /api/config"""
        return self.run_test("Get Site Config", "GET", "/config", 200)

    def test_contact_submission(self):
        """Test POST /api/contact"""
        timestamp = datetime.now().strftime('%H%M%S')
        test_data = {
            "name": f"Test User {timestamp}",
            "phone": "+91 9876543210",
            "business_name": "Test Business Ltd",
            "industry": "Real Estate",
            "message": "This is a test submission for API validation."
        }
        
        success, response = self.run_test(
            "Submit Contact Form", 
            "POST", 
            "/contact", 
            200,  # FastAPI typically returns 200 for successful POST, not 201
            data=test_data
        )
        
        if success and response:
            # Verify the response contains expected fields
            required_fields = ['id', 'name', 'phone', 'timestamp']
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                print(f"⚠️  WARNING: Response missing fields: {missing_fields}")
                return False, response
            else:
                print(f"✅ Contact submission response contains all required fields")
                return True, response
        
        return success, response

    def test_get_contacts(self):
        """Test GET /api/contacts"""
        return self.run_test("Get All Contacts", "GET", "/contacts", 200)

    def test_update_config(self):
        """Test PUT /api/config"""
        test_config = {
            "whatsapp_number": "919032247068",
            "email": "Nikethangouda@gmail.com", 
            "company_name": "GlideQuantum Labs",
            "tagline": "We Build Software That Grows Your Business"
        }
        
        return self.run_test(
            "Update Site Config",
            "PUT",
            "/config", 
            200,
            data=test_config
        )

    def test_book_demo(self):
        """Test POST /api/book-demo"""
        timestamp = datetime.now().strftime('%H%M%S')
        test_data = {
            "name": f"Demo Test User {timestamp}",
            "phone": "+91 9876543210",
            "email": f"demo{timestamp}@test.com",
            "business_name": "Test Demo Business",
            "preferred_date": "2024-12-20",
            "preferred_time": "10:00 AM",
            "notes": "This is a test demo booking for API validation."
        }
        
        success, response = self.run_test(
            "Book Demo Call", 
            "POST", 
            "/book-demo", 
            200,
            data=test_data
        )
        
        if success and response:
            # Verify the response contains expected fields
            required_fields = ['id', 'name', 'phone', 'preferred_date', 'preferred_time', 'timestamp', 'status']
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                print(f"⚠️  WARNING: Demo booking response missing fields: {missing_fields}")
                return False, response
            else:
                print(f"✅ Demo booking response contains all required fields")
                return True, response
        
        return success, response

    def test_get_demo_bookings(self):
        """Test GET /api/demo-bookings"""
        return self.run_test("Get All Demo Bookings", "GET", "/demo-bookings", 200)

    def run_all_tests(self):
        """Run all API tests"""
        print("=" * 60)
        print("🚀 Starting GlideQuantum Labs API Testing")
        print(f"🌐 Base URL: {self.base_url}")
        print("=" * 60)

        # Test basic connectivity first
        self.test_root_endpoint()
        
        # Test site configuration
        self.test_get_config()
        
        # Test contact submission (core functionality)
        self.test_contact_submission()
        
        # Test getting contacts  
        self.test_get_contacts()
        
        # Test config update
        self.test_update_config()
        
        # Test new demo booking functionality
        self.test_book_demo()
        self.test_get_demo_bookings()

        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Tests Run: {self.tests_run}")
        print(f"Tests Passed: {self.tests_passed}")
        print(f"Tests Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        # Print detailed results for failed tests
        failed_tests = [test for test in self.test_results if not test['success']]
        if failed_tests:
            print(f"\n❌ FAILED TESTS:")
            for test in failed_tests:
                print(f"   - {test['test_name']}: {test['response_preview']}")
        else:
            print(f"\n✅ All tests passed!")

        return self.tests_passed == self.tests_run

def main():
    tester = GlideQuantumAPITester()
    all_passed = tester.run_all_tests()
    
    # Save results to file
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            'timestamp': datetime.now().isoformat(),
            'total_tests': tester.tests_run,
            'passed_tests': tester.tests_passed,
            'success_rate': tester.tests_passed/tester.tests_run*100 if tester.tests_run > 0 else 0,
            'test_details': tester.test_results
        }, f, indent=2)
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())