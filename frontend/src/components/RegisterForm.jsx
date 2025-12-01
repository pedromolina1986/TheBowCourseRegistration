import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import ColorButton from './ColorButton';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [department, setDepartment] = useState('SD');
  const [program, setProgram] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [yearLevel, setYearLevel] = useState(2);

  const programYearMap = {
    "diploma": 2,
    "post-diploma": 1,
    "certificate": 0.5
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      alert("Please enter a username and password.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5002/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_name: username,
          user_password: password,
          user_type: "student",
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone_number: phone,
          program,
          department_id: 1,
          year_level: yearLevel,
          assigned_by: 1
        })
      });

      // Check if server responded
      if (!response) {
        alert("❌ No response from server. Is it running on port 5000?");
        return;
      }

      // Try parsing JSON
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        console.error("JSON parse error:", jsonError);
        alert("❌ Server returned invalid JSON. Check backend.");
        return;
      }

      // Handle server error messages
      if (!response.ok) {
        console.error("Server error response:", result);
        alert(`❌ Registration failed: ${result.error || JSON.stringify(result)}`);
        return;
      }

      alert("🎉 Account created successfully!");
      window.location.href = "/login";

    } catch (error) {
      console.error("Fetch/network error:", error);
      if (error instanceof TypeError) {
        alert("❌ Cannot connect to server. Check if server is running and CORS settings.");
      } else {
        alert(`❌ Unexpected error: ${error.message}`);
      }
    }
  };



  const onBackToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200 mx-auto my-8 p-8 max-w-7xl">
      <div className="mb-8">
        <GraduationCap className="w-10 h-10 mb-3" />
        <h2 className="text-2xl text-neutral-900 mb-2">Personal Information</h2>
        <p className="text-neutral-600">
          Please provide your personal details to create your student account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-neutral-700 mb-2">
              First Name <span className="text-neutral-500">*</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-neutral-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-700 mb-2">
              Last Name <span className="text-neutral-500">*</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-neutral-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-neutral-700 mb-2">
            Email Address <span className="text-neutral-500">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-neutral-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
            placeholder="Enter your email address"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-neutral-700 mb-2">
              Phone Number <span className="text-neutral-500">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-neutral-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              placeholder="(000) 000-0000"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-700 mb-2">
              Date of Birth <span className="text-neutral-500">*</span>
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border border-neutral-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <h3 className="text-lg text-neutral-900 mb-4">Academic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-neutral-700 mb-2">
                Department <span className="text-neutral-500">*</span>
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border border-neutral-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              >
                <option value="">Select Department</option>
                <option value="SD">Software Development (SD)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-700 mb-2">
                Program <span className="text-neutral-500">*</span>
              </label>
              <select
                value={program}
                onChange={(e) => {
                  setProgram(e.target.value);
                  setYearLevel(programYearMap[e.target.value] || 0);
                }}
                className="w-full border border-neutral-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              >
                <option value="">Select Program</option>
                <option value="diploma">Diploma (2 years)</option>
                <option value="post-diploma">Post-Diploma (1 year)</option>
                <option value="certificate">Certificate (6 months)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <h3 className="text-lg text-neutral-900 mb-4">Account Credentials</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-neutral-700 mb-2">
                Username <span className="text-neutral-500">*</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-50 border border-neutral-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                placeholder="Choose a username"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-700 mb-2">
                Password <span className="text-neutral-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-neutral-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                placeholder="Create a password"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm text-neutral-700 mb-2">
              Confirm Password <span className="text-neutral-500">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-neutral-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-6">
          <span
            className="text-neutral-600 hover:text-neutral-900 text-sm cursor-pointer"
            onClick={onBackToLogin}
          >
            ← Back to Login
          </span>

          <ColorButton type='submit' label={"Create Account →"} />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
