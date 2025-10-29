import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";

const compendiumData = [
  {
    id: 1,
    title: "Combat System Overview",
    category: "combat",
    tags: ["Core Rules", "Combat", "Basics"],
    content: `
      <p>The combat system in Will & Whispers is designed to be fast-paced and strategic. Each combat round represents approximately 6 seconds of in-game time.</p>
      
      <h3>Initiative</h3>
      <p>At the start of combat, all participants roll for <span class="tooltip-word" data-tooltip="Half of your Dexterity stat, rounded up">Initiative</span>. This determines the order in which characters act during each round.</p>
      
      <h3>Action Points</h3>
      <p>Each character has a pool of <span class="tooltip-word" data-tooltip="Resource spent to perform actions in combat">Action Points (AP)</span> that they can spend on their turn to perform various actions:</p>
      <ul>
        <li><strong>Attack:</strong> 2 AP - Make a basic attack against an enemy</li>
        <li><strong>Move:</strong> 1 AP - Move up to your Speed in feet</li>
        <li><strong>Cast Spell:</strong> Variable AP - Depends on spell level</li>
        <li><strong>Use Item:</strong> 1 AP - Use or apply an item</li>
        <li><strong>Defend:</strong> 1 AP - Increase your defense until your next turn</li>
      </ul>
      
      <div class="media-container">
        <img src="https://via.placeholder.com/800x400/1a2332/64b5f6?text=Combat+Example+Diagram" alt="Combat Example" />
      </div>
    `,
  },
  {
    id: 2,
    title: "Magic System",
    category: "spells",
    tags: ["Magic", "Spells", "Core Rules"],
    content: `
      <p>Magic in Will & Whispers is powered by the caster's <span class="tooltip-word" data-tooltip="Represents your magical energy and mental fortitude">Willpower</span> and <span class="tooltip-word" data-tooltip="Represents your connection to spiritual forces">Spirit</span> stats.</p>
      
      <h3>Spell Casting</h3>
      <p>To cast a spell, you must:</p>
      <ol>
        <li>Have the spell learned or in your spellbook</li>
        <li>Have sufficient Action Points</li>
        <li>Meet any material component requirements</li>
        <li>Make a successful casting roll (d20 + Mind + Spell Level)</li>
      </ol>
      
      <h3>Spell Schools</h3>
      <p>There are six schools of magic:</p>
      <ul>
        <li><strong>Evocation:</strong> Offensive spells that deal direct damage</li>
        <li><strong>Abjuration:</strong> Protective spells and wards</li>
        <li><strong>Conjuration:</strong> Summoning and creation magic</li>
        <li><strong>Transmutation:</strong> Spells that alter physical properties</li>
        <li><strong>Illusion:</strong> Deception and sensory manipulation</li>
        <li><strong>Divination:</strong> Information gathering and prediction</li>
      </ul>
      
      <p>For more detailed spell descriptions, see the <a href="#" class="external-link">Complete Spell List</a>.</p>
    `,
  },
  {
    id: 3,
    title: "Character Creation Guide",
    category: "rules",
    tags: ["Character Creation", "Core Rules", "Basics"],
    content: `
      <p>Creating a character in Will & Whispers is a collaborative process between player and Game Master. Follow these steps:</p>
      
      <h3>Step 1: Choose Species</h3>
      <p>Your <span class="tooltip-word" data-tooltip="Your character's ancestral race">Species</span> determines some base statistics and special abilities. Options include Human, Elf, Dwarf, Orc, and more.</p>
      
      <h3>Step 2: Select Background</h3>
      <p>Your background represents your character's history before adventuring. It grants skill proficiencies and starting equipment.</p>
      
      <h3>Step 3: Assign Stats</h3>
      <p>You have 20 points to distribute among your six core stats. Remember that increasing a stat costs points equal to its current value.</p>
      
      <h3>Step 4: Choose Skills</h3>
      <p>Skills represent your trained abilities. You have 15 skill points to spend and can specialize in up to 3 skills.</p>
      
      <h3>Step 5: Select Starting Equipment</h3>
      <p>Based on your background and class choices, you'll receive starting equipment and gold to purchase additional gear.</p>
    `,
  },
  {
    id: 4,
    title: "Elven Species",
    category: "species",
    tags: ["Species", "Playable Races", "Elves"],
    content: `
      <p>Elves are graceful, long-lived beings with a deep connection to nature and magic. They are known for their keen senses and agility.</p>
      
      <h3>Racial Traits</h3>
      <ul>
        <li><strong>Ability Score Increase:</strong> +2 to Dexterity</li>
        <li><strong>Speed:</strong> 7 (35 feet per move action)</li>
        <li><strong>Darkvision:</strong> Can see in dim light within 60 feet as if it were bright light</li>
        <li><strong>Keen Senses:</strong> Proficiency in Perception skill</li>
        <li><strong>Fey Ancestry:</strong> Advantage on saving throws against being charmed</li>
        <li><strong>Trance:</strong> Elves don't need to sleep, instead entering a 4-hour meditative state</li>
      </ul>
      
      <div class="media-container">
        <img src="https://via.placeholder.com/600x400/1a2332/64b5f6?text=Elven+Warrior" alt="Elven Warrior" />
      </div>
      
      <h3>Cultural Background</h3>
      <p>Elves typically live in forest kingdoms, though some have adapted to urban or desert environments. Their societies value art, magic, and harmony with nature.</p>
    `,
  },
  {
    id: 5,
    title: "Equipment List",
    category: "equipment",
    tags: ["Equipment", "Weapons", "Armor", "Gear"],
    content: `
      <p>This section covers the various equipment available for purchase or acquisition in Will & Whispers.</p>
      
      <h3>Weapons</h3>
      <p>Weapons are categorized by type and damage:</p>
      <ul>
        <li><strong>Longsword:</strong> 1d8 slashing damage, 10 gold</li>
        <li><strong>Shortbow:</strong> 1d6 piercing damage, range 80/320, 25 gold</li>
        <li><strong>Dagger:</strong> 1d4 piercing damage, light, thrown (20/60), 2 gold</li>
        <li><strong>Greatsword:</strong> 2d6 slashing damage, heavy, two-handed, 50 gold</li>
      </ul>
      
      <h3>Armor</h3>
      <ul>
        <li><strong>Leather Armor:</strong> Armor +2, 10 gold</li>
        <li><strong>Chain Mail:</strong> Armor +5, disadvantage on Stealth, 75 gold</li>
        <li><strong>Plate Armor:</strong> Armor +8, disadvantage on Stealth, 1500 gold</li>
      </ul>
      
      <h3>Adventuring Gear</h3>
      <ul>
        <li>Backpack - 2 gold</li>
        <li>Bedroll - 1 gold</li>
        <li>Rope (50 feet) - 1 gold</li>
        <li>Torch (pack of 10) - 1 silver</li>
        <li>Healing Potion - 50 gold (restores 2d4+2 Stamina)</li>
      </ul>
    `,
  },
  {
    id: 6,
    title: "The World of Aethermoor",
    category: "world",
    tags: ["Lore", "World Building", "Setting"],
    content: `
      <p>Aethermoor is a vast continent where the boundaries between the physical and spiritual realms grow thin. It is a land of ancient magic, forgotten empires, and emerging threats.</p>
      
      <h3>Major Regions</h3>
      <ul>
        <li><strong>The Crystalline Peaks:</strong> A mountain range where reality bends and time flows strangely</li>
        <li><strong>Shadowfen Marshes:</strong> Dark wetlands inhabited by mysterious creatures and lost souls</li>
        <li><strong>The Radiant Cities:</strong> A coalition of city-states built on the ruins of an ancient civilization</li>
        <li><strong>Whisperwood Forest:</strong> An enchanted forest where the trees themselves seem to communicate</li>
      </ul>
      
      <div class="media-container">
        <img src="https://via.placeholder.com/800x500/1a2332/64b5f6?text=Map+of+Aethermoor" alt="Map of Aethermoor" />
      </div>
      
      <h3>The Great Convergence</h3>
      <p>Two centuries ago, a cataclysmic event known as the Great Convergence merged parts of the spirit realm with the material world. This event fundamentally changed magic, created new species, and awakened ancient powers.</p>
      
      <p>Learn more about the history in our <a href="#" class="external-link">Timeline of Major Events</a>.</p>
    `,
  },
];

const categories = [
  { id: "all", label: "All Entries", icon: "📚" },
  { id: "rules", label: "Core Rules", icon: "📖" },
  { id: "combat", label: "Combat", icon: "⚔️" },
  { id: "spells", label: "Spells & Magic", icon: "✨" },
  { id: "abilities", label: "Abilities", icon: "💪" },
  { id: "equipment", label: "Equipment & Gear", icon: "🛡️" },
  { id: "species", label: "Species & Races", icon: "👥" },
  { id: "backgrounds", label: "Backgrounds", icon: "📜" },
  { id: "world", label: "World & Lore", icon: "🌍" },
];

export default function WillWhispersCompendium() {
  const [currentCategory, setCurrentCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredEntries = useMemo(() => {
    return compendiumData.filter((entry) => {
      const matchesCategory =
        currentCategory === "all" || entry.category === currentCategory;
      const matchesSearch =
        searchTerm === "" ||
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [currentCategory, searchTerm]);

  const currentCategoryInfo = categories.find(
    (cat) => cat.id === currentCategory
  );

  return (
    <>
      <style>{`

      

        .header {
          background: #ffe974;
          padding: 24px 20px;
          border-bottom: 3px solid #d53d22;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 8px rgba(213, 61, 34, 0.15);
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .header_links_container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        
          flex: 1
         
        }

        .header-branding {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        h1 {
          color: #000000;
          font-size: 2em;
          font-weight: 700;
          margin: 0;
        }

        .header-subtitle {
          color: #d53d22;
          font-size: 0.9em;
          margin-top: 2px;
          font-weight: 500;
        }

        .header-link {
          color: #000000;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #ffffff;
          border: 2px solid #d53d22;
          border-radius: 6px;
          font-size: 0.9em;
          font-weight: 600;
          transition: all 0.3s;
        }

        .header-link:hover {
          background: #d53d22;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(213, 61, 34, 0.3);
        }

        .search-bar {
          max-width: 600px;
          width: 100%;
          margin: 0 auto;
          position: relative;
        }

        .search-bar input {
          width: 85%;
          padding: 14px 50px 14px 20px;
          font-size: 0.95em;
          border: 2px solid #d53d22;
          border-radius: 8px;
          background: #ffffff;
          color: #000000;
          outline: none;
          transition: all 0.3s;
        }

        .search-bar input:focus {
          border-color: #d53d22;
          box-shadow: 0 0 0 3px rgba(213, 61, 34, 0.15);
        }

        .search-bar input::placeholder {
          color: #666666;
        }

        .search-icon {
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #d53d22;
          font-size: 1.2em;
          pointer-events: none;
        }

        .mobile-menu-btn {
          display: none;
          background: #ffffff;
          border: 2px solid #d53d22;
          color: #d53d22;
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.2em;
          font-weight: 600;
          transition: all 0.3s;
        }

        .mobile-menu-btn:hover {
          background: #d53d22;
          color: #ffffff;
        }

        .sidebar-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
          animation: fadeIn 0.3s;
        }

        .sidebar-overlay.open {
          display: block;
        }

        .com-container {
          display: flex;
          max-width: 1400px;
          margin: 0 auto;
          min-height: calc(100vh - 180px);
          gap: 20px;
          padding: 20px;
          width: 90vw;
          background: #ffffff;
        }

        .sidebar {
          width: 280px;
          background: #ffe974;
          padding: 20px;
          border-radius: 12px;
          border: 2px solid #d53d22;
          position: sticky;
          top: 200px;
          height: fit-content;
          max-height: calc(100vh - 220px);
          overflow-y: auto;
          box-shadow: 0 4px 12px rgba(213, 61, 34, 0.15);
          transition: all 0.3s;
        }

        .sidebar::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar::-webkit-scrollbar-track {
          background: #ffffff;
          border-radius: 3px;
        }

        .sidebar::-webkit-scrollbar-thumb {
          background: #d53d22;
          border-radius: 3px;
        }

        .sidebar::-webkit-scrollbar-thumb:hover {
          background: #b33220;
        }

        .sidebar h3 {
          color: #000000;
          margin-bottom: 16px;
          font-size: 1.2em;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .category-list {
          list-style: none;
        }

        .category-list li {
          padding: 12px 14px;
          margin-bottom: 6px;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s;
          border-left: 3px solid transparent;
          font-size: 0.95em;
          color: #000000;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.5);
        }

        .category-list li:hover {
          background: #ffffff;
          border-left-color: #d53d22;
          transform: translateX(4px);
          box-shadow: 0 2px 4px rgba(213, 61, 34, 0.1);
        }

        .category-list li.active {
          background: #d53d22;
          border-left-color: #000000;
          color: #ffffff;
          font-weight: 700;
        }

        .category-icon {
          font-size: 1.2em;
        }

        .content {
          flex: 1;
          min-width: 0;
        }

        .content-header {
          background: #ffe974;
          padding: 20px 24px;
          border-radius: 12px;
          border: 2px solid #d53d22;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 6px rgba(213, 61, 34, 0.1);
        }

        .content-header h2 {
          color: #000000;
          font-size: 1.5em;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0;
        }

        .results-count {
          color: #ffffff;
          font-size: 0.9em;
          background: #d53d22;
          padding: 6px 14px;
          border-radius: 20px;
          font-weight: 600;
        }

        .entry {
          background: #ffffff;
          padding: 28px;
          margin-bottom: 20px;
          border-radius: 12px;
          border: 2px solid #d53d22;
          animation: fadeIn 0.4s ease-out;
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(213, 61, 34, 0.1);
        }

        .entry:hover {
          border-color: #d53d22;
          box-shadow: 0 4px 16px rgba(213, 61, 34, 0.2);
          transform: translateY(-2px);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .entry h2 {
          color: #000000;
          font-size: 1.8em;
          margin-bottom: 14px;
          font-weight: 700;
          padding-bottom: 12px;
          border-bottom: 3px solid #ffe974;
        }

        .entry-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .tag {
          background: #ffe974;
          color: #000000;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.85em;
          border: 2px solid #d53d22;
          font-weight: 600;
          transition: all 0.2s;
        }

        .tag:hover {
          background: #d53d22;
          color: #ffffff;
        }

        .entry-content {
          color: #000000;
        }

        .entry-content p {
          margin-bottom: 16px;
          line-height: 1.8;
          text-align: left;
        }

        .entry-content h3 {
          color: #d53d22;
          margin-top: 24px;
          margin-bottom: 12px;
          font-size: 1.3em;
          font-weight: 700;
        }

        .entry-content ul,
        .entry-content ol {
          margin-left: 24px;
          margin-bottom: 16px;
          text-align: left;
        }

        .entry-content li {
          margin-bottom: 10px;
          line-height: 1.7;
        }

        .entry-content strong {
          color: #000000;
          font-weight: 700;
        }

        .tooltip-word {
          color: #d53d22;
          cursor: help;
          border-bottom: 2px dotted #000000;
          position: relative;
          transition: all 0.2s;
          font-weight: 600;
        }

        .tooltip-word:hover {
          color: #000000;
          border-bottom-color: #d53d22;
        }

        .tooltip-word:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: #000000;
          color: #ffe974;
          padding: 10px 16px;
          border-radius: 8px;
          border: 2px solid #ffe974;
          white-space: nowrap;
          z-index: 1000;
          font-size: 0.85em;
          margin-bottom: 8px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
          animation: tooltipFade 0.2s;
          font-weight: 500;
        }

        @keyframes tooltipFade {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        .media-container {
          margin: 24px 0;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #d53d22;
        }

        .media-container img {
          max-width: 100%;
          display: block;
          border-radius: 12px;
        }

        .external-link {
          color: #d53d22;
          text-decoration: none;
          border-bottom: 2px solid #ffe974;
          transition: all 0.2s;
          font-weight: 600;
        }

        .external-link:hover {
          color: #000000;
          border-bottom-color: #d53d22;
        }

        .no-results {
          text-align: center;
          padding: 80px 20px;
          color: #666666;
          font-size: 1.1em;
          background: #ffffff;
          border-radius: 12px;
          border: 2px solid #d53d22;
        }

        .no-results-icon {
          font-size: 4em;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        @media (max-width: 968px) {
          .com-container  {
            flex-direction: column;
            padding: 15px;
          }

          .sidebar {
            position: fixed;
            top: 0;
            left: -100%;
            width: 280px;
            max-width: 85vw;
            height: 100vh;
            max-height: 100vh;
            border-radius: 0;
            z-index: 999;
            transition: left 0.3s ease-in-out;
            border-right: 2px solid #ffe974;
          }

          .sidebar.open {
            left: 0;
          }

          .mobile-menu-btn {
            display: block;
          }

          .content-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }

        @media (max-width: 768px) {

         .com-container  {
               width: 90%;
          }

          h1 {
            font-size: 1.5em;
          }
            .header{
            padding-botttom: 10px
            }

          .header-top {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
          .header_links_container {
           flex-wrap: wrap;
           width: 100%;
          }

          .search-bar {
          // max-width: 230px;
          width: 82%;
          margin: 0;
          position: relative;
          
        }

        .search-bar input {
          width: 95%;
          padding: 10px 50px 10px 10px;
          font-size: 0.9em;
 
          flex-grow: 1;
        }

         .search-icon {
       
          right: -25px;
        
      
      
        }


          .entry {
            padding: 20px;
          }

          .entry h2 {
            font-size: 1.5em;
          }
        }
      `}</style>

      <div className="header">
        <div className="header-container">
          <div className="header-top">
            <div className="header-branding">
              <div>
                {/* <h1>Will & Whispers</h1> */}
                <img src={logo} alt="" style={{ width: "150px" }} />
                {/* <p className="header-subtitle">Game Compendium</p> */}
              </div>
            </div>
            <div className="header_links_container">
              <div className="search-bar">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search entries, tags, or content..."
                />
                <span className="search-icon">🔍</span>
              </div>
              <Link to="/builder" className="header-link">
                <span>⚡</span>
                Character Builder
              </Link>
              <button
                className="mobile-menu-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="com-container ">
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <h3>
            <span>📂</span>
            Categories
          </h3>
          <ul className="category-list">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={currentCategory === cat.id ? "active" : ""}
                onClick={() => {
                  setCurrentCategory(cat.id);
                  setSidebarOpen(false);
                }}
              >
                <span className="category-icon">{cat.icon}</span>
                <span>{cat.label}</span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="content">
          <div className="content-header">
            <h2>
              <span>{currentCategoryInfo?.icon}</span>
              {currentCategoryInfo?.label}
            </h2>
            <span className="results-count">
              {filteredEntries.length}{" "}
              {filteredEntries.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          {filteredEntries.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">📭</div>
              <p>No entries found matching your criteria.</p>
              <p
                style={{
                  fontSize: "0.9em",
                  marginTop: "10px",
                  color: "#546e7a",
                }}
              >
                Try adjusting your search or selecting a different category.
              </p>
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <article key={entry.id} className="entry">
                <h2>{entry.title}</h2>
                <div className="entry-tags">
                  {entry.tags.map((tag, idx) => (
                    <span key={idx} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  className="entry-content"
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                />
              </article>
            ))
          )}
        </main>
      </div>
    </>
  );
}
