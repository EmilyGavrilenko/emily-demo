create table if not exists attractions (
  id bigint generated always as identity primary key,
  name text not null,
  category text not null,
  description text not null,
  image text not null default '',
  created_at timestamptz not null default now()
);

alter table attractions enable row level security;

create policy "Anyone can read attractions"
  on attractions for select
  using (true);

create policy "Anyone can insert attractions"
  on attractions for insert
  with check (true);

-- Seed the original 20 São Paulo attractions
insert into attractions (name, category, description, image) values
  ('Avenida Paulista', 'Landmark', 'The cultural heart of São Paulo — stroll past museums, street performers, and iconic skyline views along this bustling boulevard.', 'https://images.unsplash.com/photo-1554168848-228452c09d60?w=400&q=80'),
  ('Pinacoteca do Estado', 'Museum', 'The oldest art museum in São Paulo, housed in a stunning 19th-century building with an incredible Brazilian art collection.', 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=400&q=80'),
  ('Mercado Municipal (Mercadão)', 'Food & Market', 'A historic food hall famous for its mortadella sandwiches, fresh tropical fruits, and gorgeous stained-glass windows.', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80'),
  ('Ibirapuera Park', 'Park', 'São Paulo''s answer to Central Park — a vast urban oasis with jogging trails, museums, and stunning modernist architecture by Niemeyer.', 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80'),
  ('MASP (Museu de Arte de São Paulo)', 'Museum', 'An architectural icon on Paulista Avenue, housing the most important collection of European art in Latin America.', 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&q=80'),
  ('Vila Madalena Street Art', 'Art & Culture', 'Wander through Beco do Batman and the colorful streets of this bohemian neighborhood covered in jaw-dropping murals.', 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&q=80'),
  ('Liberdade (Japanese Quarter)', 'Neighborhood', 'Explore the largest Japanese community outside Japan — ramen shops, lantern-lit streets, and the vibrant Sunday street fair.', 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&q=80'),
  ('São Paulo Cathedral (Catedral da Sé)', 'Landmark', 'A massive neo-Gothic cathedral in the city center, one of the largest churches in the world with breathtaking interior domes.', 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80'),
  ('Eat at a Traditional Churrascaria', 'Food', 'Experience all-you-can-eat Brazilian barbecue — endless cuts of grilled meat carved tableside at legendary spots like Fogo de Chão.', 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80'),
  ('Edifício Itália Rooftop', 'Viewpoint', 'Dine at the top of one of São Paulo''s tallest skyscrapers for panoramic 360° views of the sprawling metropolis.', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80'),
  ('Football Match at Neo Química Arena', 'Sports', 'Feel the electric atmosphere of Brazilian football firsthand — cheer alongside passionate Corinthians fans at a live match.', 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&q=80'),
  ('Rua Augusta Nightlife', 'Nightlife', 'From underground clubs to rooftop bars, this legendary street is the epicenter of São Paulo''s world-class nightlife scene.', 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=400&q=80'),
  ('Instituto Butantan', 'Museum & Science', 'A fascinating biomedical research center with museums showcasing venomous snakes, spiders, and the history of vaccine production.', 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&q=80'),
  ('Take a Cooking Class', 'Experience', 'Learn to make coxinhas, pão de queijo, and feijoada from local chefs — the tastiest souvenir you can bring home.', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80'),
  ('Pico do Jaraguá', 'Nature', 'Hike to the highest point in São Paulo for sweeping views of the city and surrounding Atlantic Forest reserve.', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80'),
  ('Theatro Municipal', 'Landmark', 'An opulent early-1900s opera house inspired by the Paris Opéra — catch a ballet, concert, or simply admire the architecture.', 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&q=80'),
  ('Feira da Benedita (Benedito Calixto Fair)', 'Market', 'A Saturday antique market in Pinheiros with vintage furniture, vinyl records, local art, and delicious street food.', 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&q=80'),
  ('Museum of Football (Museu do Futebol)', 'Museum', 'Located under the Pacaembu stadium stands, this interactive museum brings the passion and history of Brazilian football to life.', 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&q=80'),
  ('Samba Night in Vila Madalena', 'Nightlife & Culture', 'Join locals at a traditional roda de samba — live percussion, cold chopps, and dancing under the stars.', 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&q=80'),
  ('Day Trip to Embu das Artes', 'Day Trip', 'A charming colonial town just 30 minutes away, famous for its weekend artisan fair, galleries, and craft beer scene.', 'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=400&q=80');
