import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const preferenceCategories = [
  'Politics and Governance',
  'Climate Change and Environment',
  'Economy and Trade',
  'Technology and Innovation',
  'Health and Medicine',
  'Education and Policies',
  'Science and Space Exploration',
  'Entertainment and Pop Culture',
  'Sports and Competitions',
  'International Relations',
  'Social Issues and Movements',
  'Crime and Law'
];

const mockNewsData: Record<string, Array<{ sentiment: string; title: string; description: string; content: string }>> = {
  'Politics and Governance': [
    { sentiment: 'positive', title: 'Policy Reform', description: 'A new policy reform introduced.', content: 'The government has unveiled reforms to address economic disparities.' },
    { sentiment: 'neutral', title: 'Election Results', description: 'Latest election outcomes.', content: 'Recent elections have concluded with significant voter turnout.' },
    { sentiment: 'negative', title: 'Scandal Exposed', description: 'Political scandal uncovered.', content: 'Corruption scandal implicates top officials.' },
    { sentiment: 'positive', title: 'International Agreement', description: 'Countries sign a trade deal.', content: 'The trade agreement boosts cooperation in the region.' },
    { sentiment: 'neutral', title: 'Debates Continue', description: 'Parliament debates critical issues.', content: 'Discussions on healthcare policies remain inconclusive.' },
  ],
  'Climate Change and Environment': [
    { sentiment: 'negative', title: 'Rising Temperatures', description: 'Global warming on the rise.', content: 'The latest data shows alarming temperature increases globally.' },
    { sentiment: 'positive', title: 'Renewable Energy', description: 'Advancement in solar technology.', content: 'A breakthrough in solar energy storage offers hope for sustainable living.' },
    { sentiment: 'neutral', title: 'Wildlife Study', description: 'New species discovered.', content: 'A rare species of amphibian was recently discovered in the Amazon rainforest.' },
    { sentiment: 'negative', title: 'Deforestation Surge', description: 'Forests under threat.', content: 'Rapid deforestation continues to threaten biodiversity in key regions.' },
    { sentiment: 'positive', title: 'Reforestation Projects', description: 'Efforts to restore forests.', content: 'Community-driven reforestation projects show significant progress.' },
  ],
  'Economy and Trade': [
    { sentiment: 'neutral', title: 'Stock Market Trends', description: 'Stock markets remain stable.', content: 'Global stocks experience steady growth amid investor confidence.' },
    { sentiment: 'negative', title: 'Recession Fears', description: 'Economy faces challenges.', content: 'Experts warn of potential economic downturn in key industries.' },
    { sentiment: 'positive', title: 'Trade Agreement Signed', description: 'New trade deal boosts markets.', content: 'The recently signed trade deal strengthens economic ties.' },
    { sentiment: 'negative', title: 'Supply Chain Issues', description: 'Logistical challenges persist.', content: 'Global supply chains face disruption due to unforeseen events.' },
    { sentiment: 'neutral', title: 'Job Market Analysis', description: 'Employment trends analyzed.', content: 'A study highlights emerging opportunities in the job market.' },
  ],
  'Technology and Innovation': [
    { sentiment: 'positive', title: 'AI Breakthrough', description: 'Artificial intelligence revolutionizes industries.', content: 'A new AI algorithm promises to improve efficiency in healthcare and manufacturing.' },
    { sentiment: 'negative', title: 'Data Privacy Concerns', description: 'Growing fears over data security.', content: 'Recent breaches have raised alarm over the protection of personal data online.' },
    { sentiment: 'neutral', title: 'Quantum Computing Advances', description: 'Progress in quantum computing.', content: 'New developments in quantum computing are paving the way for future tech breakthroughs.' },
    { sentiment: 'positive', title: '5G Rollout', description: '5G network expands worldwide.', content: 'The global rollout of 5G promises faster internet and improved connectivity.' },
    { sentiment: 'negative', title: 'Tech Job Cuts', description: 'Tech companies lay off workers.', content: 'Several tech giants announce large-scale layoffs in the face of economic uncertainty.' },
  ],
  'Health and Medicine': [
    { sentiment: 'positive', title: 'Cancer Treatment Advances', description: 'New treatment options available.', content: 'A breakthrough in cancer therapy promises to extend survival rates for patients.' },
    { sentiment: 'neutral', title: 'Vaccine Distribution', description: 'Global vaccination progress.', content: 'Efforts to distribute vaccines are ramping up to fight ongoing global health threats.' },
    { sentiment: 'negative', title: 'Mental Health Crisis', description: 'Surge in mental health issues.', content: 'The pandemic has exacerbated mental health struggles, leading to a rise in anxiety and depression.' },
    { sentiment: 'positive', title: 'Genetic Research Success', description: 'New gene therapy shows promise.', content: 'Scientists have successfully tested gene editing techniques for treating genetic disorders.' },
    { sentiment: 'neutral', title: 'Healthcare Accessibility', description: 'Access to healthcare in remote areas.', content: 'Efforts to bring healthcare to rural areas are progressing, but challenges remain.' },
  ],
  'Education and Policies': [
    { sentiment: 'neutral', title: 'New Education Standards', description: 'Revised education policies.', content: 'A new set of standards aims to improve the quality of education in public schools.' },
    { sentiment: 'positive', title: 'Online Learning Growth', description: 'Rise in remote education.', content: 'Online platforms continue to expand access to quality education globally.' },
    { sentiment: 'negative', title: 'Student Loan Crisis', description: 'Growing debt among graduates.', content: 'The student loan crisis is becoming a major financial burden for young adults.' },
    { sentiment: 'positive', title: 'Tech in Classrooms', description: 'Technology-enhanced learning.', content: 'Classrooms are increasingly adopting tech tools to improve student engagement and outcomes.' },
    { sentiment: 'neutral', title: 'Teacher Shortages', description: 'Challenges in hiring teachers.', content: 'Many schools struggle to hire qualified teachers, affecting classroom quality.' },
  ],
  'Science and Space Exploration': [
    { sentiment: 'positive', title: 'Mars Mission Success', description: 'Breakthrough in space exploration.', content: 'NASA’s latest mission to Mars has provided unprecedented data on the planet’s atmosphere.' },
    { sentiment: 'neutral', title: 'Black Hole Discovery', description: 'New understanding of black holes.', content: 'A newly discovered black hole challenges existing theories about space-time.' },
    { sentiment: 'negative', title: 'Space Debris Concerns', description: 'Increased space debris threatening satellites.', content: 'Experts warn that space debris is becoming a serious issue for future missions.' },
    { sentiment: 'positive', title: 'Space Tourism Growth', description: 'Space travel becomes a reality.', content: 'The emergence of private space companies is pushing forward the development of space tourism.' },
    { sentiment: 'neutral', title: 'Telescope Milestone', description: 'New telescope advancements.', content: 'A new telescope will allow scientists to peer deeper into space and time than ever before.' },
  ],
  'Entertainment and Pop Culture': [
    { sentiment: 'positive', title: 'Box Office Hits', description: 'Major movies breaking records.', content: 'The latest superhero movie has become a box office sensation, surpassing expectations.' },
    { sentiment: 'neutral', title: 'Streaming Wars', description: 'Competition in the streaming industry.', content: 'Major streaming platforms are competing for viewers with original content.' },
    { sentiment: 'negative', title: 'Celebrity Scandal', description: 'A public figure in trouble.', content: 'A famous actor faces backlash after a controversial statement goes viral.' },
    { sentiment: 'positive', title: 'Music Album Success', description: 'A new album tops the charts.', content: 'The latest pop album has hit number one on multiple global charts.' },
    { sentiment: 'neutral', title: 'Fashion Trends', description: 'New fashion trends emerge.', content: 'Seasonal fashion shows are unveiling the latest trends for the upcoming year.' },
  ],
  'Sports and Competitions': [
    { sentiment: 'positive', title: 'Championship Victory', description: 'A team clinches the championship title.', content: 'The underdog team won the championship, making history in the sport.' },
    { sentiment: 'negative', title: 'Injury Woes', description: 'Star athlete faces injury.', content: 'A top athlete faces a major injury that could sideline them for the season.' },
    { sentiment: 'neutral', title: 'Tournament Schedule', description: 'Upcoming sporting events.', content: 'The schedule for the upcoming sports tournament has been finalized.' },
    { sentiment: 'positive', title: 'Olympic Preparation', description: 'Athletes preparing for the Olympics.', content: 'Athletes worldwide are ramping up their training for the upcoming Olympic Games.' },
    { sentiment: 'neutral', title: 'Sports Technology', description: 'Tech innovations in sports.', content: 'New advancements in wearable technology are changing the way athletes train and recover.' },
  ],
  'International Relations': [
    { sentiment: 'positive', title: 'Diplomatic Talks', description: 'Countries working towards peace.', content: 'Diplomatic talks between two nations aim to resolve ongoing tensions.' },
    { sentiment: 'neutral', title: 'Trade Agreements Signed', description: 'New economic deals between nations.', content: 'Countries have signed a new series of trade agreements aimed at strengthening economic ties.' },
    { sentiment: 'negative', title: 'Border Disputes Escalate', description: 'Tensions rise over border disputes.', content: 'Ongoing disputes over borders are threatening international peace and stability.' },
    { sentiment: 'positive', title: 'International Aid Efforts', description: 'Countries helping each other.', content: 'Countries are joining forces to provide aid to nations affected by natural disasters.' },
    { sentiment: 'neutral', title: 'Peacekeeping Missions', description: 'International peacekeeping operations.', content: 'Peacekeeping missions are underway in conflict zones to prevent further escalation.' },
  ],
  'Social Issues and Movements': [
    { sentiment: 'positive', title: 'Climate Justice Movement', description: 'Youth-led climate protests.', content: 'Young activists are leading global protests demanding climate action from world leaders.' },
    { sentiment: 'negative', title: 'Income Inequality', description: 'Growing gap between rich and poor.', content: 'Income inequality continues to widen, affecting social mobility and stability.' },
    { sentiment: 'neutral', title: 'Gender Equality Initiatives', description: 'Efforts to close gender gap.', content: 'Global initiatives are pushing for equal rights and opportunities for all genders.' },
    { sentiment: 'positive', title: 'Racial Equality Campaign', description: 'Movements for racial justice.', content: 'Grassroots movements are gaining momentum in the fight for racial equality and justice.' },
    { sentiment: 'negative', title: 'Homelessness Crisis', description: 'Growing number of homeless people.', content: 'The number of homeless individuals continues to rise in major cities worldwide.' },
  ],
  'Crime and Law': [
    { sentiment: 'negative', title: 'Cybercrime Surge', description: 'Rising number of online crimes.', content: 'The number of cybercrimes has increased drastically, affecting individuals and businesses alike.' },
    { sentiment: 'positive', title: 'Legal Reform Progress', description: 'New laws aim to improve justice.', content: 'Recent legal reforms focus on improving access to justice and reducing corruption in the judicial system.' },
    { sentiment: 'neutral', title: 'Prison System Overhaul', description: 'Changes in prison policies.', content: 'The prison system is undergoing changes aimed at improving rehabilitation programs for inmates.' },
    { sentiment: 'negative', title: 'Organized Crime Rise', description: 'Increase in organized criminal activity.', content: 'Organized crime groups are becoming more sophisticated, making law enforcement efforts more difficult.' },
    { sentiment: 'positive', title: 'Criminal Justice Reform', description: 'Efforts to reduce mass incarceration.', content: 'Reforms are being implemented to address mass incarceration and provide better rehabilitation opportunities.' },
  ],
};


export default function Preferences() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-blue-600';
      case 'neutral':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleBack = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {selectedCategory ? selectedCategory : 'News Preferences'}
        </h1>
        <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {selectedCategory ? 'Back to Categories' : 'Back to Home'}
        </Button>
      </div>

      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {preferenceCategories.map((category, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{category}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {mockNewsData[selectedCategory]?.map((news, index) => (
              <Card key={index} className="w-full">
                <CardHeader>
                  <CardTitle>{news.title}</CardTitle>
                  <CardDescription>{news.description}</CardDescription>
                  <p className={`text-sm font-semibold ${getSentimentColor(news.sentiment)}`}>
                    Sentiment: {news.sentiment}
                  </p>
                  <p className="mt-2 text-sm text-gray-800">{news.content}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
