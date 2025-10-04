import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const audioRef = useRef<HTMLAudioElement>(null);

  const meditations = [
    { id: 1, title: 'Утренняя медитация', duration: '15 мин', description: 'Настройтесь на день с осознанностью' },
    { id: 2, title: 'Глубокое расслабление', duration: '20 мин', description: 'Снятие стресса и напряжения' },
    { id: 3, title: 'Медитация перед сном', duration: '12 мин', description: 'Спокойный переход ко сну' }
  ];

  const programs = [
    { 
      title: 'Трансформация личности', 
      duration: '3 месяца', 
      description: 'Глубокая работа над собой с персональным сопровождением',
      features: ['12 индивидуальных сессий', 'Домашние практики', 'Поддержка 24/7']
    },
    { 
      title: 'Осознанная жизнь', 
      duration: '6 недель', 
      description: 'Групповая программа для обретения баланса и гармонии',
      features: ['6 групповых встреч', 'Медитативные практики', 'Рабочая тетрадь']
    },
    { 
      title: 'Индивидуальная сессия', 
      duration: '90 мин', 
      description: 'Разовая консультация для решения конкретного запроса',
      features: ['Персональный подход', 'Практики на дом', 'Запись сессии']
    }
  ];

  const testimonials = [
    { name: 'Анна Соколова', text: 'Работа с Вадимом изменила мое восприятие жизни. Я научилась слышать себя и принимать осознанные решения.', role: 'Предприниматель' },
    { name: 'Михаил Петров', text: 'После программы я наконец обрел внутренний баланс. Техники медитации стали частью моей ежедневной практики.', role: 'IT-директор' },
    { name: 'Елена Иванова', text: 'Вадим - настоящий профессионал. Его мягкий подход и глубокие знания помогли мне пройти через сложный период.', role: 'Психолог' }
  ];

  const blogPosts = [
    { title: 'Как медитация меняет мозг', date: '15 марта 2024', excerpt: 'Научные исследования показывают удивительные изменения в структуре мозга...' },
    { title: 'Пять шагов к осознанности', date: '8 марта 2024', excerpt: 'Простые практики, которые можно внедрить в повседневную жизнь уже сегодня...' },
    { title: 'Работа с внутренним критиком', date: '1 марта 2024', excerpt: 'Как перестать быть своим самым строгим судьей и обрести внутреннюю свободу...' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'programs', 'testimonials', 'meditations', 'blog', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-heading font-bold gradient-gold-text">Вадим Маринин</h1>
            <div className="hidden md:flex gap-8">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'about', label: 'Обо мне' },
                { id: 'programs', label: 'Программы' },
                { id: 'testimonials', label: 'Отзывы' },
                { id: 'meditations', label: 'Медитации' },
                { id: 'blog', label: 'Блог' },
                { id: 'contact', label: 'Контакты' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-body transition-colors ${
                    activeSection === item.id ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Button className="md:hidden" variant="ghost" size="icon">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
                Путь к себе через <span className="gradient-gold-text">осознанность</span>
              </h2>
              <p className="text-lg text-muted-foreground font-body">
                Коучинг и медитативные практики для тех, кто готов к глубоким изменениям и внутренней трансформации
              </p>
              <div className="flex gap-4">
                <Button onClick={() => scrollToSection('programs')} className="gradient-gold text-white px-8 py-6 text-lg rounded-full">
                  Выбрать программу
                </Button>
                <Button onClick={() => scrollToSection('contact')} variant="outline" className="px-8 py-6 text-lg rounded-full border-primary text-primary hover:bg-primary/10">
                  Связаться
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img 
                src="/img/cb2e59de-6c10-4c6d-9479-4530189a774c.jpg" 
                alt="Медитация" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="/img/c353ab84-e4e3-42be-b1c2-84a67985bd83.jpg" 
                alt="Вадим Маринин" 
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-4xl md:text-5xl font-heading font-bold">Обо мне</h2>
              <div className="space-y-4 text-muted-foreground font-body">
                <p>
                  Более 15 лет я помогаю людям находить внутреннюю гармонию и раскрывать свой потенциал через практики осознанности и трансформационный коучинг.
                </p>
                <p>
                  Мой подход объединяет древние медитативные техники с современными методами работы с сознанием. Я убежден, что каждый человек обладает внутренними ресурсами для счастливой и наполненной жизни.
                </p>
                <p>
                  Сертифицированный коуч ICF, практик медитации традиции випассана, автор методики "Осознанная трансформация".
                </p>
              </div>
              <div className="flex gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold gradient-gold-text">15+</div>
                  <div className="text-sm text-muted-foreground">лет практики</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold gradient-gold-text">500+</div>
                  <div className="text-sm text-muted-foreground">клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold gradient-gold-text">20+</div>
                  <div className="text-sm text-muted-foreground">программ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="programs" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Программы</h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Выберите формат работы, который откликается вашему запросу
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-xl">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="text-sm text-primary font-body font-semibold">{program.duration}</div>
                    <h3 className="text-2xl font-heading font-bold">{program.title}</h3>
                    <p className="text-muted-foreground font-body">{program.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm font-body">
                        <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => scrollToSection('contact')} className="w-full gradient-gold text-white rounded-full">
                    Узнать подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Отзывы</h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Истории трансформации моих клиентов
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8 space-y-4">
                  <div className="flex gap-1 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground font-body italic">{testimonial.text}</p>
                  <div>
                    <div className="font-heading font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground font-body">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="meditations" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Медитации</h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Слушайте медитативные практики онлайн
            </p>
          </div>
          <div className="space-y-4">
            {meditations.map((meditation) => (
              <Card key={meditation.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={togglePlay}
                      size="icon" 
                      className="gradient-gold text-white rounded-full h-14 w-14 flex-shrink-0"
                    >
                      <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
                    </Button>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-lg">{meditation.title}</h3>
                      <p className="text-sm text-muted-foreground font-body">{meditation.description}</p>
                    </div>
                    <div className="text-sm text-muted-foreground font-body">{meditation.duration}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-semibold">Утренняя медитация</span>
                  <span className="text-sm text-muted-foreground font-body">
                    {formatTime(currentTime)} / {formatTime(duration || 300)}
                  </span>
                </div>
                <div className="space-y-2">
                  <input 
                    type="range" 
                    min="0" 
                    max={duration || 300}
                    value={currentTime}
                    onChange={(e) => {
                      const time = Number(e.target.value);
                      setCurrentTime(time);
                      if (audioRef.current) audioRef.current.currentTime = time;
                    }}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-center gap-4">
                  <Button variant="ghost" size="icon">
                    <Icon name="SkipBack" size={20} />
                  </Button>
                  <Button 
                    onClick={togglePlay}
                    size="icon" 
                    className="gradient-gold text-white h-12 w-12 rounded-full"
                  >
                    <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icon name="SkipForward" size={20} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <audio 
            ref={audioRef}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      </section>

      <section id="blog" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Блог</h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Статьи об осознанности и саморазвитии
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 space-y-4">
                  <div className="text-sm text-primary font-body">{post.date}</div>
                  <h3 className="text-xl font-heading font-bold">{post.title}</h3>
                  <p className="text-muted-foreground font-body">{post.excerpt}</p>
                  <Button variant="link" className="text-primary p-0 h-auto font-body">
                    Читать далее <Icon name="ArrowRight" size={16} className="ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Контакты</h2>
            <p className="text-lg text-muted-foreground font-body">
              Свяжитесь со мной для консультации
            </p>
          </div>
          <Card>
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-body font-semibold">Имя</label>
                  <Input placeholder="Ваше имя" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-body font-semibold">Email</label>
                  <Input type="email" placeholder="your@email.com" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-body font-semibold">Телефон</label>
                  <Input type="tel" placeholder="+7 (___) ___-__-__" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-body font-semibold">Сообщение</label>
                  <Textarea placeholder="Расскажите о вашем запросе..." className="rounded-lg min-h-32" />
                </div>
                <Button type="submit" className="w-full gradient-gold text-white py-6 rounded-full text-lg">
                  Отправить заявку
                </Button>
              </form>
              <div className="mt-8 pt-8 border-t border-border space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground font-body">
                  <Icon name="Mail" size={20} className="text-primary" />
                  <span>coach@vadimmarinin.ru</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground font-body">
                  <Icon name="Phone" size={20} className="text-primary" />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground font-body">
                  <Icon name="MapPin" size={20} className="text-primary" />
                  <span>Москва, онлайн-сессии</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-secondary text-secondary-foreground py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-heading font-bold gradient-gold-text mb-4">Вадим Маринин</h3>
              <p className="text-sm text-secondary-foreground/80 font-body">
                Коучинг и медитативные практики для трансформации жизни
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-sm font-body">
                {['Главная', 'Обо мне', 'Программы', 'Отзывы', 'Медитации', 'Блог', 'Контакты'].map(item => (
                  <li key={item}>
                    <button className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-4">
                <Button size="icon" variant="ghost" className="text-secondary-foreground hover:text-primary">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="text-secondary-foreground hover:text-primary">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="text-secondary-foreground hover:text-primary">
                  <Icon name="Youtube" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-secondary-foreground/20 text-center text-sm text-secondary-foreground/60 font-body">
            © 2024 Вадим Маринин. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;