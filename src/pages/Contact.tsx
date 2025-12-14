import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { Label } from '@/components/ui/label';
import { FloatingLabelTextarea } from '@/components/ui/floating-label-textarea';
import { Card } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/layout/Footer';

const contactInfo = [
  { icon: Phone, title: 'Téléphone', value: '+216 58789685', description: 'Lun-Ven : 8h-20h, Sam : 9h-17h' },
  { icon: Mail, title: 'Email', value: 'centremedicale@gmail.com', description: 'Réponse sous 24h' },
  { icon: MapPin, title: 'Adresse', value: '123 Avenue Habib Bourguiba', description: 'Tunis, Tunisie' },
  { icon: Clock, title: 'Horaires', value: 'Lun-Ven : 8h-20h', description: 'Urgences 24h/24' },
];

const faqList = [
  { question: 'Comment prendre rendez-vous ?', answer: 'Vous pouvez prendre rendez-vous via notre formulaire ou par téléphone.' },
  { question: 'Quels documents apporter ?', answer: 'Merci d’apporter votre carte d’identité et vos anciens dossiers médicaux.' },
  { question: 'Comment accéder à mon dossier ?', answer: 'Connectez-vous à votre compte sur notre plateforme pour consulter vos dossiers.' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', sujet: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: 'Message envoyé !', description: 'Nous vous répondrons dans les plus brefs délais.' });
    setFormData({ nom: '', email: '', telephone: '', sujet: '', message: '' });
    setIsSubmitting(false);
  };

  const floatingInput = (id: string, label: string, value: string, required = false, type = 'text') => (
    <FloatingLabelInput
      id={id}
      type={type}
      label={label}
      value={value}
      onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
      required={required}
      className="mb-0"
    />
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Contact Form & Map */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <div className="mb-8">
                <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Envoyez-nous un message
                </span>
                <h2 className="text-3xl font-bold mb-4">
                  Formulaire de <span className="text-gradient">contact</span>
                </h2>
                <p className="text-muted-foreground">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                </p>
              </div>

              <Card className="p-10 border border-border bg-background/80 rounded-2xl shadow-none">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nom & Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {floatingInput('nom', 'Nom complet *', formData.nom, true)}
                    {floatingInput('email', 'Email *', formData.email, true, 'email')}
                  </div>

                  {/* Téléphone & Sujet */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {floatingInput('telephone', 'Téléphone', formData.telephone)}
                    {floatingInput('sujet', 'Sujet *', formData.sujet, true)}
                  </div>

                  {/* Message */}
                  <FloatingLabelTextarea
                    id="message"
                    label="Message *"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                  />

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full transition-all shadow-none hover:shadow-none hover:scale-105"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    {!isSubmitting && <Send className="ml-2 h-5 w-5" />}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Map & FAQ */}
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">Nous trouver</h3>
                <div className="rounded-3xl overflow-hidden h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.72691973073!2d10.166666!3d36.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34b1c6f6a3b3%3A0xabc123!2sTunis!5e0!3m2!1sfr!2stn!4v1702500000000!5m2!1sfr!2stn"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xl mb-4">Questions fréquentes</h4>
                <div className="space-y-3">
                  {faqList.map((faq, i) => (
                    <div key={i} className="border border-muted/30 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                        className="flex justify-between items-center w-full p-4 text-left cursor-pointer hover:bg-muted/20 transition-colors rounded-xl"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {faqOpen === i && (
                        <div className="px-4 pb-4 text-sm text-muted-foreground">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgence & Contact Infos */}
      <section className="py-12 bg-background/50">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-full max-w-5xl flex flex-col gap-8">
            {/* Urgence */}
            <Card className="p-8 border border-primary/30 rounded-2xl bg-background flex flex-col items-center gap-6 shadow-none">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MessageSquare className="h-7 w-7 text-primary" />
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2 text-base">Besoin d'aide urgente ?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Notre service d'urgences est disponible 24h/24 et 7j/7. N'hésitez pas à nous appeler.
                </p>
                <Button variant="outline" size="sm" className="border-primary text-primary shadow-none hover:shadow-none transition-transform duration-200 hover:scale-105">
                  <Phone className="mr-2 h-4 w-4" />
                  Appeler maintenant
                </Button>
              </div>
            </Card>

            {/* Contact Infos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {contactInfo.map((info, i) => (
                <Card key={i} className="p-4 text-center border border-primary/30 shadow-none bg-background rounded-2xl">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1 text-xs">{info.title}</h3>
                  <p className="text-primary font-medium mb-1 text-xs">{info.value}</p>
                  <p className="text-[10px] text-muted-foreground">{info.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
    </div>
  );
}
