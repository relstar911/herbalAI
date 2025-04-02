
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const AuthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Auth callback error:', error);
      }

      // Zurück zur Startseite navigieren
      navigate('/');
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Anmeldung wird verarbeitet...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-heilkunst-green mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
