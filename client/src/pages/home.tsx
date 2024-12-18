import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function Home() {
  const navigate = useNavigate()
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  
  // Form states
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })
  
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: ""
  })

  // Loading states
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isRegisterLoading, setIsRegisterLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoginLoading(true)
    
    try {
      const response = await fetch('http://localhost:1234/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
        credentials: 'include' // Cookie'leri almak için
      })

      const data = await response.json()

      if (response.ok) {
        // Başarılı giriş
        setIsLoginOpen(false)
        navigate('/dashboard') // veya başka bir sayfaya yönlendir
      } else {
        // Hata durumu
        alert(data.message || 'Giriş başarısız')
      }
    } catch (error) {
      alert('Bir hata oluştu')
    } finally {
      setIsLoginLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsRegisterLoading(true)

    try {
      const response = await fetch('http://localhost:1234/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerForm),
        credentials: 'include'
      })

      const data = await response.json()

      if (response.ok) {
        // Başarılı kayıt
        setIsRegisterOpen(false)
        alert('Kayıt başarılı! Giriş yapabilirsiniz.')
      } else {
        // Hata durumu
        alert(data.message || 'Kayıt başarısız')
      }
    } catch (error) {
      alert('Bir hata oluştu')
    } finally {
      setIsRegisterLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Fu Game</h1>
        <p className="text-lg text-gray-600 mb-8">Eğlenceli oyun dünyasına hoş geldiniz!</p>
        
        <div className="space-x-4">
          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="lg">
                Giriş Yap
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <form onSubmit={handleLogin}>
                <DialogHeader>
                  <DialogTitle>Giriş Yap</DialogTitle>
                  <DialogDescription>
                    Hesabınıza giriş yapın
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="ornek@email.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Şifre</Label>
                    <Input 
                      id="password" 
                      type="password"
                      placeholder="********"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button className="w-full" type="submit" disabled={isLoginLoading}>
                    {isLoginLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="lg">
                Kayıt Ol
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <form onSubmit={handleRegister}>
                <DialogHeader>
                  <DialogTitle>Kayıt Ol</DialogTitle>
                  <DialogDescription>
                    Yeni bir hesap oluşturun
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Kullanıcı Adı</Label>
                    <Input 
                      id="username" 
                      type="text" 
                      placeholder="kullaniciadi"
                      value={registerForm.username}
                      onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      placeholder="ornek@email.com"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Şifre</Label>
                    <Input 
                      id="register-password" 
                      type="password"
                      placeholder="********"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                      required
                    />
                  </div>
                  <Button className="w-full" type="submit" disabled={isRegisterLoading}>
                    {isRegisterLoading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
