import PurpleButton from "./PurpleButton";
import WhiteButton from "./WhiteButton";

const signUpClick = () => 
  {
    window.location.href = "/register"
  }

const CTA = () => (
  <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Ready to Start Your Software Development Journey?
      </h2>
      <p className="text-gray-300 mb-8">
        Join thousands of students who have launched successful careers in technology through our comprehensive programs.
      </p>
      <div className="flex gap-4 justify-center">
        <WhiteButton OnclickHandler={signUpClick} label={"Sign Up Now"}/>
        <PurpleButton label={"Contact Admissions"}/>
      </div>
    </div>
  </section>
);

export default CTA;