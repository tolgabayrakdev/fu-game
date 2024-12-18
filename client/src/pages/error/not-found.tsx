import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
            <div className="text-center space-y-6 p-8">
                <div className="space-y-2">
                    <h1 className="text-9xl font-bold text-gray-300">404</h1>
                    <h2 className="text-3xl font-semibold text-gray-800">Sayfa Bulunamadı</h2>
                    <p className="text-gray-600 max-w-md mx-auto">
                        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                        Ana sayfaya dönerek devam edebilirsiniz.
                    </p>
                </div>

                <div className="flex justify-center gap-4">
                    <Button
                        variant="default"
                        onClick={() => navigate("/")}
                    >
                        Ana Sayfaya Dön
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                    >
                        Geri Git
                    </Button>
                </div>
            </div>
        </div>
    );
}