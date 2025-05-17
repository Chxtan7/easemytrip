
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mb-8 w-full max-w-md flex justify-center">
        <div 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="relative w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl">
            T
            <span className="absolute -right-1 -top-1 text-xs bg-secondary text-white rounded-full w-5 h-5 flex items-center justify-center">
              E
            </span>
          </div>
          <span className="font-bold text-2xl text-gray-800 dark:text-white">TripEase</span>
        </div>
      </div>

      <Card className="w-full max-w-md shadow-lg border-0 dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="pt-6">
          <Tabs
            defaultValue={activeTab}
            onValueChange={(value) => setActiveTab(value as "login" | "signup")}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-0">
              <LoginForm />
            </TabsContent>
            <TabsContent value="signup" className="mt-0">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>By logging in or creating an account, you agree to our</p>
        <p>
          <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and{" "}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
