import { useState } from 'react';

type IconName = 'sun' | 'arrow' | 'heart' | 'pin' | 'calendar' | 'users' | 'search' | 'check' | 'menu';
function Icon({ name, className = 'h-5 w-5', filled = false }: { name: IconName; className?: string; filled?: boolean }) {
  const paths: Record<IconName, React.ReactNode> = {
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M7 3v4m10-4v4M3 11h18" /></>,
    users: <><circle cx="9" cy="7" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-17a3 3 0 0 1 0 6m2 4a6 6 0 0 1 3 5v2" /></>,
    search: <><circle cx="10" cy="10" r="6.5" /><path d="m15 15 6 6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  };
  return <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={`${className} shrink-0`} aria-hidden="true">{paths[name]}</svg>;
}

const trips = [
  { id: 1, name: 'The art of doing nothing', place: 'Amalfi Coast, Italy', region: 'Europe', type: 'By the sea', days: 7, price: 890, rating: '4.9', tag: 'A little dolce vita', image: 'photo-1612698093158-e07e2a8f2a4e', fallback: 'photo-1533105079780-92b9be482077', description: 'Slow mornings, hidden coves, and limoncello sunsets. Discover the coast at your own pace, with a boutique seaside stay and a boat day included.' },
  { id: 2, name: 'Your own slice of paradise', place: 'Ubud & Canggu, Bali', region: 'Asia', type: 'Off the beaten path', days: 10, price: 1150, rating: '4.9', tag: 'Find your slow', image: 'photo-1537996194471-e657df975ab4', fallback: '', description: 'From emerald rice terraces to barefoot beach cafés. Includes a peaceful villa stay, a guided countryside walk, and plenty of time to find your own rhythm.' },
  { id: 3, name: 'A different shade of blue', place: 'Milos, Greece', region: 'Europe', type: 'By the sea', days: 6, price: 740, rating: '4.8', tag: 'Island state of mind', image: 'photo-1613395877344-13d4a8e0d49e', fallback: '', description: 'Whitewashed villages, moonlike beaches, and the bluest water you have ever seen. A small island escape with a charming local stay and a sailing excursion.' },
  { id: 4, name: 'Take the scenic route', place: 'Dolomites, Italy', region: 'Europe', type: 'Into the wild', days: 8, price: 980, rating: '4.9', tag: 'A breath of fresh air', image: 'photo-1464822759023-fed622ff2c3b', fallback: '', description: 'Alpine lakes and wide-open trails, followed by long lunches in mountain huts. Includes a lodge stay and two guided hikes, with routes for every pace.' },
];
const categories = ['All escapes', 'By the sea', 'Into the wild', 'Off the beaten path'];
function TravelImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [failed, setFailed] = useState(false);
  return failed ? <div className={`${className} flex items-center justify-center bg-[#dce7df] text-[#315d55]`}><svg viewBox="0 0 200 120" className="h-full w-full" role="img" aria-label={alt}><rect width="200" height="120" fill="#dce7df" /><circle cx="145" cy="32" r="15" fill="#f5cb69" /><path d="m0 120 70-85 55 60 30-30 45 55" fill="#658d7c" /></svg></div> : <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}

export default function App() {
  const [category, setCategory] = useState('All escapes');
  const [region, setRegion] = useState('Anywhere');
  const [month, setMonth] = useState('August');
  const [guests, setGuests] = useState('2');
  const [appliedRegion, setAppliedRegion] = useState('Anywhere');
  const [searchNote, setSearchNote] = useState('');
  const [saved, setSaved] = useState<number[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const [openTrip, setOpenTrip] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [emailMessage, setEmailMessage] = useState('');
  const visible = trips.filter(t => (category === 'All escapes' || t.type === category) && (appliedRegion === 'Anywhere' || t.region === appliedRegion) && (!savedOnly || saved.includes(t.id)));
  const button = 'min-h-11 cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#205745] focus-visible:ring-offset-4';

  function search() {
    setAppliedRegion(region);
    setSavedOnly(false);
    setSearchNote(`${month} escapes for ${guests} ${guests === '1' ? 'traveler' : 'travelers'} · ${region === 'Anywhere' ? 'all destinations' : region}`);
    document.getElementById('escapes')?.scrollIntoView({ behavior: 'smooth' });
  }
  function subscribe(e: React.FormEvent) {
    e.preventDefault();
    try {
      localStorage.setItem('sunday-summer-newsletter', JSON.stringify({ email, date: new Date().toISOString() }));
      setEmailMessage('You’re on the local preview list. Here’s to your next escape.');
      setSubscribed(true);
    } catch { setEmailMessage('Your browser could not save this. Please try again with local storage enabled.'); }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#faf9f6] font-sans text-[#263c32]">
      <header className="relative z-20 mx-auto flex h-23 max-w-[1440px] items-center justify-between px-6 md:px-12 lg:px-20">
        <a href="#" aria-label="Sunday home" className={`flex items-center gap-2.5 ${button}`}><Icon name="sun" className="h-9 w-9 text-[#cf762f]" /><span className="text-[29px] font-semibold tracking-[-1.5px]">sunday<span className="text-[#cf762f]">.</span></span></a>
        <nav className="hidden items-center gap-9 text-sm font-medium md:flex" aria-label="Main navigation">
          <a href="#escapes" className={`${button} flex items-center`}>Find your escape</a>
          <a href="#difference" className={`${button} flex items-center`}>The sunday way</a>
          <a href="#journal" className={`${button} flex items-center`}>A little inspiration <span className="ml-1 text-[#b2682e]">↗</span></a>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => { setSavedOnly(!savedOnly); document.getElementById('escapes')?.scrollIntoView({ behavior: 'smooth' }); }} aria-pressed={savedOnly} className={`${button} flex items-center gap-2 text-sm`}><Icon name="heart" /><span className="hidden lg:inline">Your daydreams</span>{saved.length > 0 && <span className="rounded-full bg-[#f2d16c] px-2 py-1 text-xs">{saved.length}</span>}</button>
          <a href="#escapes" className={`${button} ml-3 hidden items-center gap-4 rounded-full bg-[#f3d16b] px-5 text-sm font-semibold md:flex`}>Let’s get away <Icon name="arrow" className="h-4 w-4" /></a>
          <button className={`${button} p-2 md:hidden`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}><Icon name="menu" /></button>
        </div>
        {menuOpen && <nav className="absolute left-0 right-0 top-full flex flex-col gap-2 border-t border-[#dedfd6] bg-[#faf9f6] p-6 shadow-lg md:hidden">{[['Find your escape', '#escapes'], ['The sunday way', '#difference'], ['A little inspiration', '#journal']].map(([label, href]) => <a className={`${button} flex items-center`} href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
      </header>

      <main>
        <section className="relative mx-3 min-h-[620px] rounded-[16px] bg-[#247985] md:mx-6 md:min-h-[640px]">
          <div className="absolute inset-0 overflow-hidden rounded-[16px]"><TravelImage src="/images/summer-coast.png" alt="Sunlit Italian coastal village above clear turquoise Mediterranean water" className="h-full w-full object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-r from-[#102f30]/70 via-[#133e3c]/25 to-transparent" /></div>
          <div className="relative mx-auto max-w-[1280px] px-6 pb-36 pt-17 md:px-12 md:pt-20 lg:px-14">
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-white"><span className="h-px w-8 bg-[#f1d175]" /> A LITTLE FURTHER FROM EVERYDAY</div>
            <h1 className="max-w-[640px] font-serif text-[62px] leading-[1.03] tracking-[-2px] text-white md:text-[82px]">Less routine.<br />More <span className="italic text-[#ffe29a]">summer.</span></h1>
            <p className="mt-6 max-w-[390px] text-base leading-7 text-white">Salt in your hair. Nowhere to rush.<br />Find the kind of holiday that stays with you.</p>
            <a href="#escapes" className={`${button} mt-7 inline-flex items-center gap-8 rounded-full bg-[#f4d374] px-6 py-3.5 text-sm font-semibold`}>Find your sunshine <Icon name="arrow" className="h-4 w-4" /></a>
            <div className="absolute bottom-12 right-8 hidden items-center gap-2 rounded-full border border-white/60 bg-[#183c36]/70 px-4 py-2 text-xs text-white lg:flex"><Icon name="pin" className="h-3.5 w-3.5" /> Somewhere on the Italian Riviera</div>
          </div>
          <div className="relative mx-auto -mt-20 w-[calc(100%-32px)] max-w-[1050px] translate-y-12 rounded-xl bg-white p-5 shadow-[0_12px_45px_-15px_#193d3430] md:p-6">
            <div className="grid items-center gap-4 md:grid-cols-[1.2fr_1fr_1fr_auto]">
              <label className="flex items-center gap-3 border-[#e3e5de] md:border-r"><Icon name="pin" className="h-5 w-5 text-[#647266]" /><span className="flex-1 text-xs font-semibold">WHERE TO?<select aria-label="Destination" value={region} onChange={e => setRegion(e.target.value)} className="mt-1 block min-h-11 w-full cursor-pointer bg-transparent pr-4 text-sm font-normal outline-[#205745]"><option value="Anywhere">Anywhere sounds good</option><option>Europe</option><option>Asia</option></select></span></label>
              <label className="flex items-center gap-3 border-[#e3e5de] md:border-r"><Icon name="calendar" className="h-5 w-5 text-[#647266]" /><span className="flex-1 text-xs font-semibold">WHEN?<select aria-label="Travel month" value={month} onChange={e => setMonth(e.target.value)} className="mt-1 block min-h-11 w-full cursor-pointer bg-transparent pr-4 text-sm font-normal outline-[#205745]">{['June', 'July', 'August', 'September'].map(m => <option key={m}>{m}</option>)}</select></span></label>
              <label className="flex items-center gap-3"><Icon name="users" className="h-5 w-5 text-[#647266]" /><span className="flex-1 text-xs font-semibold">WITH WHO?<select aria-label="Number of travelers" value={guests} onChange={e => setGuests(e.target.value)} className="mt-1 block min-h-11 w-full cursor-pointer bg-transparent text-sm font-normal outline-[#205745]">{['1', '2', '3', '4', '5', '6'].map(n => <option value={n} key={n}>{n} {n === '1' ? 'traveler' : 'travelers'}</option>)}</select></span></label>
              <button onClick={search} className={`${button} flex items-center justify-center gap-3 rounded-lg bg-[#284e3e] px-6 py-4 text-sm font-medium text-white`}><Icon name="search" className="h-4 w-4" />Explore escapes</button>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-21 flex max-w-[1100px] flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 pb-8 text-sm text-[#526057] md:gap-x-16" aria-label="Our promises">
          <span className="flex items-center gap-2"><Icon name="sun" className="h-4 w-4" />Good days, thoughtfully made</span>
          <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4" />Small stays. Big feelings.</span>
          <span className="flex items-center gap-2"><span className="text-[#9a6027]">★</span>4.9/5 from happy wanderers</span>
        </section>

        <section id="escapes" className="mx-auto max-w-[1440px] scroll-mt-8 px-6 pb-18 pt-10 md:px-12 lg:px-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#8b653b]">OUT OF OFFICE. INTO YOUR ELEMENT.</p><h2 className="font-serif text-[38px] leading-tight tracking-[-1px] md:text-[44px]">{savedOnly ? 'Your saved daydreams' : 'Where will summer take you?'}</h2><p className="mt-3 text-sm text-[#647064]">Handpicked places for sun-seekers, slow-livers, and a little bit of both.</p></div>
            <button onClick={() => { setCategory('All escapes'); setRegion('Anywhere'); setAppliedRegion('Anywhere'); setSavedOnly(false); setSearchNote(''); }} className={`${button} flex items-center gap-4 border-b border-[#7b887b] text-sm font-medium`}>View all escapes <Icon name="arrow" className="h-4 w-4" /></button>
          </div>
          <div className="mb-7 mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Escape type">{categories.map((c, i) => <button key={c} role="tab" aria-selected={category === c} onClick={() => setCategory(c)} className={`${button} flex items-center gap-2 rounded-full border px-5 text-sm ${category === c ? 'border-[#2c4e3c] bg-[#2c4e3c] text-white' : 'border-[#dfe1d8] bg-transparent hover:bg-[#eeeee6]'}`}>{i === 0 ? <Icon name="sun" className="h-4 w-4" /> : <span aria-hidden="true">{['', '≈', '♧', '↗'][i]}</span>}{c}</button>)}</div>
          {searchNote && <p className="mb-5 text-sm text-[#526057]" role="status">{visible.length} escapes · {searchNote}. Sample itineraries; availability is not live.</p>}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {visible.map(trip => <article key={trip.id} className="min-w-0">
              <div className="group relative aspect-[1.08] overflow-hidden rounded-xl bg-[#dfe5da]">
                <TravelImage src={`https://images.unsplash.com/${trip.image}?auto=format&fit=crop&w=800&q=85`} alt={trip.place} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-[#fffdf4] px-3 py-1.5 text-xs font-medium">{trip.tag}</span>
                <button aria-label={`${saved.includes(trip.id) ? 'Unsave' : 'Save'} ${trip.place}`} aria-pressed={saved.includes(trip.id)} onClick={() => setSaved(prev => prev.includes(trip.id) ? prev.filter(id => id !== trip.id) : [...prev, trip.id])} className={`${button} absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white ${saved.includes(trip.id) ? 'text-[#a44a34]' : 'text-[#344b40]'}`}><Icon name="heart" className="h-4 w-4" filled={saved.includes(trip.id)} /></button>
                <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white px-2.5 py-1.5 text-xs font-medium"><span className="text-[#9c6629]">★</span>{trip.rating}</span>
              </div>
              <div className="pt-4"><p className="mb-2 flex items-center gap-1.5 text-xs text-[#667266]"><Icon name="pin" className="h-3.5 w-3.5" />{trip.place}</p><h3 className="font-serif text-[23px] tracking-[-0.5px]">{trip.name}</h3><div className="mt-3 flex items-center justify-between gap-2"><p className="text-sm text-[#657063]">{trip.days} easy-going days</p><button onClick={() => setOpenTrip(openTrip === trip.id ? null : trip.id)} aria-expanded={openTrip === trip.id} className={`${button} flex items-center gap-2 text-sm`}><span>from <strong className="font-semibold text-[#2b4234]">€{trip.price.toLocaleString()}</strong></span><Icon name="arrow" className="h-4 w-4" /></button></div></div>
              {openTrip === trip.id && <div className="mt-3 rounded-lg border border-[#dce1d5] bg-[#f1f2e9] p-4 text-sm"><p className="leading-6">{trip.description}</p><p className="mt-3 font-semibold">€{(trip.price * Number(guests)).toLocaleString()} for {guests} {guests === '1' ? 'person' : 'people'}</p><p className="mt-2 text-xs text-[#5a6858]">Inspiration itinerary · per-person pricing excludes flights. No booking or payment is taken in this preview.</p></div>}
            </article>)}
          </div>
          {visible.length === 0 && <div className="rounded-xl border border-dashed border-[#bec7b8] p-12 text-center"><Icon name="sun" className="mx-auto mb-4 h-8 w-8" /><h3 className="font-serif text-2xl">A little more exploring?</h3><p className="mt-3 text-sm">{savedOnly ? 'Tap a heart on an escape to keep your daydreams here.' : 'No escapes match just yet. Try a different destination or escape type.'}</p></div>}
        </section>

        <section id="difference" className="mx-6 mb-16 grid scroll-mt-8 gap-8 rounded-2xl bg-[#edf0e5] px-7 py-10 md:mx-12 md:grid-cols-[1fr_1.3fr] md:px-12 lg:mx-20 lg:px-14">
          <div><p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[#65714e]">NOT JUST A HOLIDAY. A FEELING.</p><h2 className="font-serif text-4xl leading-tight tracking-[-1px]">A little less planning.<br />A lot more living.</h2></div>
          <div className="grid gap-6 sm:grid-cols-3">{[{ icon: 'sun', title: 'Picked with feeling', text: 'Places we love. Local people we trust. Never just another pin on a map.' }, { icon: 'users', title: 'Your kind of pace', text: 'Room to wander, time to linger. Because the best moments aren’t scheduled.' }, { icon: 'heart', title: 'Leave a little good', text: 'Independent stays and local experiences. Good for you, and where you go.' }].map(item => <div key={item.title}><Icon name={item.icon as IconName} className="mb-4 h-6 w-6 text-[#7b713e]" /><h3 className="mb-2 text-sm font-semibold">{item.title}</h3><p className="text-sm leading-6 text-[#5f6a55]">{item.text}</p></div>)}</div>
        </section>

        <section id="journal" className="mx-auto flex max-w-[1280px] flex-col justify-between gap-7 px-6 pb-16 md:flex-row md:items-center md:px-12">
          <div><div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.15em] text-[#8b653b]"><Icon name="sun" className="h-4 w-4" /> A POSTCARD, EVERY NOW AND THEN</div><h2 className="font-serif text-3xl">Keep a little summer in your inbox.</h2><p className="mt-2 text-sm text-[#657063]">Fresh places, slow stories, and good reasons to get away.</p></div>
          <form onSubmit={subscribe} className="w-full md:max-w-[410px]"><div className="flex rounded-full border border-[#c9cfc1] bg-white p-1.5"><input aria-label="Your email address" type="email" required placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} className="min-h-11 min-w-0 flex-1 rounded-full px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#205745]" /><button disabled={subscribed} className={`${button} flex items-center gap-3 rounded-full bg-[#f1d16f] px-5 text-sm font-semibold`}>{subscribed ? 'You’re on the list' : 'Count me in'}<Icon name={subscribed ? 'check' : 'arrow'} className="h-4 w-4" /></button></div><p role="status" className="mt-3 px-4 text-xs text-[#657063]">{emailMessage || 'A little sunshine. No spam. Preview signup saved on this device.'}</p></form>
        </section>
      </main>
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e2e4db] px-6 py-7 text-xs text-[#63705f] md:px-12 lg:px-20"><p>© {new Date().getFullYear()} sunday. Made for getting away.</p><p className="flex items-center gap-2">Life’s better in the sunshine. <Icon name="sun" className="h-4 w-4 text-[#97662d]" /></p></footer>
    </div>
  );
}
