import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

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
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          background: #0f1419;
          color: #e0e6ed;
          line-height: 1.6;
        }
  
        .header {
          background: #1e2738;
          padding: 24px 20px;
          border-bottom: 2px solid #2196f3;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
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

        .header-branding {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        h1 {
          color: #64b5f6;
          font-size: 2em;
          font-weight: 700;
          margin: 0;
        }

        .header-subtitle {
          color: #90a4ae;
          font-size: 0.9em;
          margin-top: 2px;
        }

        .header-link {
          color: #64b5f6;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #0f1922;
          border: 1px solid #2d3548;
          border-radius: 6px;
          font-size: 0.9em;
          transition: all 0.3s;
        }

        .header-link:hover {
          background: #1a2332;
          border-color: #2196f3;
          transform: translateY(-2px);
        }

        .search-bar {
          max-width: 600px;
          width: 100%;
          margin: 0 auto;
          position: relative;
        }

        .search-bar input {
          width: 100%;
          padding: 14px 50px 14px 20px;
          font-size: 0.95em;
          border: 1px solid #37474f;
          border-radius: 8px;
          background: #0f1419;
          color: #e0e6ed;
          outline: none;
          transition: all 0.3s;
        }

        .search-bar input:focus {
          border-color: #2196f3;
          box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
        }

        .search-bar input::placeholder {
          color: #78909c;
        }

        .search-icon {
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #64b5f6;
          font-size: 1.2em;
          pointer-events: none;
        }

        .mobile-menu-btn {
          display: none;
          background: #0f1922;
          border: 1px solid #2d3548;
          color: #64b5f6;
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.2em;
          transition: all 0.3s;
        }

        .mobile-menu-btn:hover {
          background: #1a2332;
          border-color: #2196f3;
        }

        .sidebar-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 998;
          animation: fadeIn 0.3s;
        }

        .sidebar-overlay.open {
          display: block;
        }

        .container {
          display: flex;
          max-width: 1400px;
          margin: 0 auto;
          min-height: calc(100vh - 180px);
          gap: 20px;
          padding: 20px;
        }

        .sidebar {
          width: 280px;
          background: #1a2332;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #2d3548;
          position: sticky;
          top: 200px;
          height: fit-content;
          max-height: calc(100vh - 220px);
          overflow-y: auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transition: all 0.3s;
        }

        .sidebar::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar::-webkit-scrollbar-track {
          background: #0f1419;
          border-radius: 3px;
        }

        .sidebar::-webkit-scrollbar-thumb {
          background: #37474f;
          border-radius: 3px;
        }

        .sidebar::-webkit-scrollbar-thumb:hover {
          background: #455a64;
        }

        .sidebar h3 {
          color: #64b5f6;
          margin-bottom: 16px;
          font-size: 1.2em;
          font-weight: 600;
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
          color: #b0bec5;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .category-list li:hover {
          background: #0f1922;
          border-left-color: #2196f3;
          color: #e0e6ed;
          transform: translateX(4px);
        }

        .category-list li.active {
          background: #1e3a5f;
          border-left-color: #2196f3;
          color: #64b5f6;
          font-weight: 600;
        }

        .category-icon {
          font-size: 1.2em;
        }

        .content {
          flex: 1;
          min-width: 0;
        }

        .content-header {
          background: #1a2332;
          padding: 20px 24px;
          border-radius: 12px;
          border: 1px solid #2d3548;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .content-header h2 {
          color: #64b5f6;
          font-size: 1.5em;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0;
        }

        .results-count {
          color: #90a4ae;
          font-size: 0.9em;
          background: #0f1922;
          padding: 6px 14px;
          border-radius: 20px;
        }

        .entry {
          background: #1a2332;
          padding: 28px;
          margin-bottom: 20px;
          border-radius: 12px;
          border: 1px solid #2d3548;
          animation: fadeIn 0.4s ease-out;
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .entry:hover {
          border-color: #2196f3;
          box-shadow: 0 4px 16px rgba(33, 150, 243, 0.15);
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
          color: #64b5f6;
          font-size: 1.8em;
          margin-bottom: 14px;
          font-weight: 600;
          padding-bottom: 12px;
          border-bottom: 2px solid #2d5a8c;
        }

        .entry-tags {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .tag {
          background: #1e3a5f;
          color: #90caf9;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.85em;
          border: 1px solid #2d5a8c;
          font-weight: 500;
          transition: all 0.2s;
        }

        .tag:hover {
          background: #2d5a8c;
          color: #e3f2fd;
        }

        .entry-content {
          color: #b0bec5;
        }

        .entry-content p {
          margin-bottom: 16px;
          line-height: 1.8;
          text-align: left;
        }

        .entry-content h3 {
          color: #64b5f6;
          margin-top: 24px;
          margin-bottom: 12px;
          font-size: 1.3em;
          font-weight: 600;
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
          color: #90caf9;
          font-weight: 600;
        }

        .tooltip-word {
          color: #64b5f6;
          cursor: help;
          border-bottom: 2px dotted #2196f3;
          position: relative;
          transition: all 0.2s;
        }

        .tooltip-word:hover {
          color: #90caf9;
        }

        .tooltip-word:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: #0f1419;
          color: #e0e6ed;
          padding: 10px 16px;
          border-radius: 8px;
          border: 1px solid #2196f3;
          white-space: nowrap;
          z-index: 1000;
          font-size: 0.85em;
          margin-bottom: 8px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
          animation: tooltipFade 0.2s;
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
          border: 1px solid #2d3548;
        }

        .media-container img {
          max-width: 100%;
          display: block;
          border-radius: 12px;
        }

        .external-link {
          color: #64b5f6;
          text-decoration: none;
          border-bottom: 1px solid #2196f3;
          transition: all 0.2s;
          font-weight: 500;
        }

        .external-link:hover {
          color: #90caf9;
          border-bottom-color: #64b5f6;
        }

        .no-results {
          text-align: center;
          padding: 80px 20px;
          color: #78909c;
          font-size: 1.1em;
          background: #1a2332;
          border-radius: 12px;
          border: 1px solid #2d3548;
        }

        .no-results-icon {
          font-size: 4em;
          margin-bottom: 20px;
          opacity: 0.5;
        }

        @media (max-width: 968px) {
          .container {
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
            border-right: 2px solid #2196f3;
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
          h1 {
            font-size: 1.5em;
          }

          .header-top {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
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
                <h1>Will & Whispers</h1>
                <p className="header-subtitle">Game Compendium</p>
              </div>
            </div>
            <Link to="/" className="header-link">
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
          <div className="search-bar">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search entries, tags, or content..."
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </div>

      <div
        className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="container">
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
