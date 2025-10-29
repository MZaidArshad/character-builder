import React, { useState, useMemo } from "react";

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
        <img src="https://via.placeholder.com/800x400/16213e/f0a500?text=Combat+Example+Diagram" alt="Combat Example" />
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
        <img src="https://via.placeholder.com/600x400/16213e/f0a500?text=Elven+Warrior" alt="Elven Warrior" />
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
        <img src="https://via.placeholder.com/800x500/16213e/f0a500?text=Map+of+Aethermoor" alt="Map of Aethermoor" />
      </div>
      
      <h3>The Great Convergence</h3>
      <p>Two centuries ago, a cataclysmic event known as the Great Convergence merged parts of the spirit realm with the material world. This event fundamentally changed magic, created new species, and awakened ancient powers.</p>
      
      <p>Learn more about the history in our <a href="#" class="external-link">Timeline of Major Events</a>.</p>
    `,
  },
];

const categories = [
  { id: "all", label: "All Entries" },
  { id: "rules", label: "Core Rules" },
  { id: "combat", label: "Combat" },
  { id: "spells", label: "Spells & Magic" },
  { id: "abilities", label: "Abilities" },
  { id: "equipment", label: "Equipment & Gear" },
  { id: "species", label: "Species & Races" },
  { id: "backgrounds", label: "Backgrounds" },
  { id: "world", label: "World & Lore" },
];

export default function WillWhispersCompendium() {
  const [currentCategory, setCurrentCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Georgia", serif;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: #e8e8e8;
          line-height: 1.6;
        }

        .header {
          background: rgba(0, 0, 0, 0.3);
          padding: 30px 20px;
          text-align: center;
          border-bottom: 3px solid #f0a500;
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
        }

        h1 {
          color: #f0a500;
          font-size: 2.5em;
          margin-bottom: 0px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .header-subtitle {
          color: #aaa;
          margin-bottom: 5px;
        }

        .header-link {
          color: #60a5fa;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 10px;
          font-size: 0.9em;
        }

        .header-link:hover {
          color: #93c5fd;
          text-decoration: underline;
        }

        .search-bar {
          max-width: 600px;
          margin: 20px auto 0;
          position: relative;
        }

        .search-bar input {
          width: 100%;
          padding: 15px 50px 15px 20px;
          font-size: 0.9em;
          border: 2px solid #f0a500;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.1);
          color: #e8e8e8;
          outline: none;
        }

        .search-bar input::placeholder {
          color: #aaa;
        }

        .search-icon {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #f0a500;
          font-size: 1.3em;
        }

        .container {
          display: flex;
          max-width: 1400px;
          margin: 0 auto;
          min-height: calc(100vh - 200px);
        }

        .sidebar {
          width: 280px;
          background: rgba(0, 0, 0, 0.3);
          padding: 20px;
          border-right: 1px solid rgba(240, 165, 0, 0.2);
          position: sticky;
          top: 230px;
          height: fit-content;
          max-height: calc(100vh - 200px);
          overflow-y: auto;
        }

        .sidebar h3 {
          color: #f0a500;
          margin-bottom: 15px;
          font-size: 1.3em;
        }

        .category-list {
          list-style: none;
        }

        .category-list li {
          padding: 10px;
          margin-bottom: 5px;
          cursor: pointer;
          border-radius: 5px;
          transition: all 0.3s;
          border-left: 3px solid transparent;
          font-size: 0.9em;
        }

        .category-list li:hover {
          background: rgba(240, 165, 0, 0.1);
          border-left-color: #f0a500;
          padding-left: 15px;
        }

        .category-list li.active {
          background: rgba(240, 165, 0, 0.2);
          border-left-color: #f0a500;
          font-weight: bold;
        }

        .content {
          flex: 1;
          padding: 30px;
        }

        .entry {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          padding: 30px;
          margin-bottom: 30px;
          border-radius: 10px;
          border: 1px solid rgba(240, 165, 0, 0.2);
          animation: fadeIn 0.5s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .entry h2 {
          color: #f0a500;
          font-size: 2em;
          margin-bottom: 10px;
          border-bottom: 2px solid #f0a500;
          padding-bottom: 10px;
        }

        .entry-tags {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .tag {
          background: rgba(240, 165, 0, 0.2);
          color: #f0a500;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.9em;
          border: 1px solid rgba(240, 165, 0, 0.3);
        }

        .entry-content h3 {
          color: #f0a500;
          margin-top: 20px;
          margin-bottom: 10px;
        }

        .entry-content ul,
        .entry-content ol {
          margin-left: 30px;
          margin-bottom: 15px;
        }

        .entry-content li {
          margin-bottom: 8px;
        }

        .tooltip-word {
          color: #f0a500;
          cursor: help;
          border-bottom: 1px dotted #f0a500;
          position: relative;
        }

        .tooltip-word:hover::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.95);
          color: #e8e8e8;
          padding: 10px 15px;
          border-radius: 5px;
          border: 1px solid #f0a500;
          white-space: nowrap;
          z-index: 1000;
          font-size: 0.9em;
          margin-bottom: 5px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .media-container {
          margin: 20px 0;
          border-radius: 10px;
          overflow: hidden;
        }

        .media-container img {
          max-width: 100%;
          display: block;
          border-radius: 10px;
        }

        .media-container iframe {
          width: 100%;
          height: 400px;
          border: none;
          border-radius: 10px;
        }

        .external-link {
          color: #f0a500;
          text-decoration: none;
          border-bottom: 1px solid #f0a500;
          transition: all 0.3s;
        }

        .external-link:hover {
          color: #ffb800;
          border-bottom-color: #ffb800;
        }

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: #aaa;
          font-size: 1.2em;
        }

        @media (max-width: 968px) {
          .container {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            position: static;
            max-height: none;
            border-right: none;
            border-bottom: 1px solid rgba(240, 165, 0, 0.2);
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2em;
          }

          .content {
            padding: 15px;
          }

          .entry {
            padding: 20px;
          }
        }
      `}</style>

      <div className="header">
        <a href="index.html" className="header-link">
          Character Builder
        </a>
        <h1>Will & Whispers</h1>
        <p className="header-subtitle">Game Compendium</p>
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search the compendium..."
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="container">
        <aside className="sidebar">
          <h3>Categories</h3>
          <ul className="category-list">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={currentCategory === cat.id ? "active" : ""}
                onClick={() => setCurrentCategory(cat.id)}
              >
                {cat.label}
              </li>
            ))}
          </ul>
        </aside>

        <main className="content">
          {filteredEntries.length === 0 ? (
            <div className="no-results">
              No entries found. Try adjusting your search or category filter.
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
