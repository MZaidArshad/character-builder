import React, { useState, useEffect } from "react";
import "./characterBuilder.css";
import jsPDF from "jspdf";
import PDFExporter from "./PDFExporter";

const CharacterBuilder = () => {
  const initialCharacter = {
    name: "",
    species: "",
    background: "",
    stats: {
      strength: 1,
      endurance: 1,
      dexterity: 1,
      mind: 1,
      willpower: 1,
      spirit: 1,
    },
    skills: {
      athletics: 0,
      stealth: 0,
      perception: 0,
      investigation: 0,
      persuasion: 0,
      intimidation: 0,
      deception: 0,
      insight: 0,
      survival: 0,
      medicine: 0,
      arcana: 0,
      history: 0,
    },
    specializations: [],
    trackers: {
      currentAP: 0,
      maxAP: 0,
      woundedStage: 0,
      armor: 0,
      tempo: 0,
      presence: 0,
      fameInfamy: 0,
    },
    textSections: {
      perks: "",
      quirks: "",
      abilities: "",
      spells: "",
      weapons: "",
      gear: "",
      injuries: "",
      items: "",
      notes: "",
    },
  };

  const [character, setCharacter] = useState(initialCharacter);
  const [savedCharacters, setSavedCharacters] = useState([]);

  const STAT_POINTS = 20;
  const SKILL_POINTS = 15;
  const MAX_SPECIALIZATIONS = 3;

  // Species and Background data
  const speciesData = {
    "": { statMods: {}, speed: 0, perks: [] },
    Human: { statMods: { willpower: 1 }, speed: 30, perks: ["Adaptable"] },
    Elf: {
      statMods: { dexterity: 1, mind: 1 },
      speed: 35,
      perks: ["Keen Senses"],
    },
    Dwarf: {
      statMods: { strength: 1, endurance: 1 },
      speed: 25,
      perks: ["Sturdy"],
    },
    Halfling: { statMods: { dexterity: 2 }, speed: 25, perks: ["Lucky"] },
  };

  const backgroundData = {
    "": { statMods: {}, perks: [] },
    Soldier: { statMods: { strength: 1 }, perks: ["Combat Training"] },
    Scholar: { statMods: { mind: 2 }, perks: ["Well Read"] },
    Rogue: { statMods: { dexterity: 1 }, perks: ["Street Smart"] },
    Noble: { statMods: { willpower: 1 }, perks: ["High Society"] },
  };

  const skillsList = [
    "athletics",
    "stealth",
    "perception",
    "investigation",
    "persuasion",
    "intimidation",
    "deception",
    "insight",
    "survival",
    "medicine",
    "arcana",
    "history",
  ];

  // Load saved characters from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("willWhispersCharacters");
    if (saved) {
      setSavedCharacters(JSON.parse(saved));
    }
  }, []);

  // Calculate derived stats
  const calculateStamina = () => {
    const base = (character.stats.strength + character.stats.endurance) * 2;
    return base;
  };

  const calculateInitiative = () => {
    return Math.ceil(character.stats.dexterity / 2);
  };

  const calculateSpeed = () => {
    return speciesData[character.species]?.speed || 30;
  };

  // Calculate stat points spent
  const calculateStatPointsSpent = () => {
    let spent = 0;
    Object.entries(character.stats).forEach(([stat, value]) => {
      // Calculate cost to reach this value from 1
      for (let i = 1; i < value; i++) {
        spent += i;
      }
    });
    return spent;
  };

  // Calculate skill points spent
  const calculateSkillPointsSpent = () => {
    return Object.values(character.skills).reduce((sum, val) => sum + val, 0);
  };

  const handleStatChange = (stat, newValue) => {
    const value = Math.max(1, Math.min(10, parseInt(newValue) || 1));
    setCharacter((prev) => ({
      ...prev,
      stats: { ...prev.stats, [stat]: value },
    }));
  };

  const handleSkillChange = (skill, change) => {
    const currentValue = character.skills[skill];
    const newValue = Math.max(0, Math.min(10, currentValue + change));

    setCharacter((prev) => ({
      ...prev,
      skills: { ...prev.skills, [skill]: newValue },
    }));
  };

  const toggleSpecialization = (skill) => {
    setCharacter((prev) => {
      const specs = [...prev.specializations];
      const index = specs.indexOf(skill);

      if (index > -1) {
        specs.splice(index, 1);
      } else if (specs.length < MAX_SPECIALIZATIONS) {
        specs.push(skill);
      }

      return { ...prev, specializations: specs };
    });
  };

  const handleTrackerChange = (tracker, value) => {
    setCharacter((prev) => ({
      ...prev,
      trackers: { ...prev.trackers, [tracker]: parseInt(value) || 0 },
    }));
  };

  const handleTextChange = (section, value) => {
    setCharacter((prev) => ({
      ...prev,
      textSections: { ...prev.textSections, [section]: value },
    }));
  };

  const saveCharacter = () => {
    const characterToSave = {
      ...character,
      id: Date.now(),
      savedAt: new Date().toISOString(),
    };

    const updated = [...savedCharacters, characterToSave];
    setSavedCharacters(updated);
    localStorage.setItem("willWhispersCharacters", JSON.stringify(updated));
    alert("Character saved successfully!");
  };

  const loadCharacter = (id) => {
    const char = savedCharacters.find((c) => c.id === id);
    if (char) {
      setCharacter(char);
    }
  };

  const deleteCharacter = (id) => {
    if (confirm("Are you sure you want to delete this character?")) {
      const updated = savedCharacters.filter((c) => c.id !== id);
      setSavedCharacters(updated);
      localStorage.setItem("willWhispersCharacters", JSON.stringify(updated));
    }
  };

  const newCharacter = () => {
    if (confirm("Start a new character? Any unsaved changes will be lost.")) {
      setCharacter(initialCharacter);
    }
  };

  const exportToPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    let yPos = 20;

    // Title
    pdf.setFontSize(20);
    pdf.text("Will & Whispers Character Sheet", pageWidth / 2, yPos, {
      align: "center",
    });
    yPos += 15;

    // Character Info
    pdf.setFontSize(12);
    pdf.text(`Name: ${character.name || "Unnamed"}`, 20, yPos);
    yPos += 7;
    pdf.text(`Species: ${character.species || "None"}`, 20, yPos);
    yPos += 7;
    pdf.text(`Background: ${character.background || "None"}`, 20, yPos);
    yPos += 10;

    // Stats
    pdf.setFontSize(14);
    pdf.text("Stats", 20, yPos);
    yPos += 7;
    pdf.setFontSize(10);
    Object.entries(character.stats).forEach(([stat, value]) => {
      pdf.text(
        `${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${value}`,
        20,
        yPos
      );
      yPos += 5;
    });
    yPos += 5;

    // Derived Stats
    pdf.setFontSize(12);
    pdf.text(`Stamina: ${calculateStamina()}`, 20, yPos);
    yPos += 6;
    pdf.text(`Initiative: ${calculateInitiative()}`, 20, yPos);
    yPos += 6;
    pdf.text(`Speed: ${calculateSpeed()}`, 20, yPos);
    yPos += 10;

    // Skills
    pdf.setFontSize(14);
    pdf.text("Skills", 20, yPos);
    yPos += 7;
    pdf.setFontSize(10);
    Object.entries(character.skills).forEach(([skill, value]) => {
      const spec = character.specializations.includes(skill)
        ? " (Specialized)"
        : "";
      pdf.text(
        `${skill.charAt(0).toUpperCase() + skill.slice(1)}: ${value}${spec}`,
        20,
        yPos
      );
      yPos += 5;
    });

    // Add new page for trackers and text sections
    pdf.addPage();
    yPos = 20;

    // Trackers
    pdf.setFontSize(14);
    pdf.text("Trackers", 20, yPos);
    yPos += 7;
    pdf.setFontSize(10);
    pdf.text(
      `Action Points: ${character.trackers.currentAP}/${character.trackers.maxAP}`,
      20,
      yPos
    );
    yPos += 6;
    pdf.text(`Wounded Stage: ${character.trackers.woundedStage}`, 20, yPos);
    yPos += 6;
    pdf.text(`Armor: ${character.trackers.armor}`, 20, yPos);
    yPos += 6;
    pdf.text(`Tempo: ${character.trackers.tempo}`, 20, yPos);
    yPos += 6;
    pdf.text(`Presence: ${character.trackers.presence}`, 20, yPos);
    yPos += 6;
    pdf.text(`Fame/Infamy: ${character.trackers.fameInfamy}`, 20, yPos);
    yPos += 10;

    // Text Sections
    const addTextSection = (title, content) => {
      if (yPos > 250) {
        pdf.addPage();
        yPos = 20;
      }
      pdf.setFontSize(12);
      pdf.text(title, 20, yPos);
      yPos += 6;
      pdf.setFontSize(9);
      const lines = pdf.splitTextToSize(content || "None", pageWidth - 40);
      pdf.text(lines, 20, yPos);
      yPos += lines.length * 4 + 5;
    };

    Object.entries(character.textSections).forEach(([section, content]) => {
      addTextSection(
        section.charAt(0).toUpperCase() + section.slice(1),
        content
      );
    });

    pdf.save(`${character.name || "character"}-sheet.pdf`);
  };

  const statPointsRemaining = STAT_POINTS - calculateStatPointsSpent();
  const skillPointsRemaining = SKILL_POINTS - calculateSkillPointsSpent();

  return (
    <>
      <div className="character-builder">
        <header className="header">
          <h1>Will & Whispers Character Builder</h1>
          <div className="header-buttons">
            <button onClick={newCharacter} className="btn btn-secondary">
              New Character
            </button>
            <button onClick={saveCharacter} className="btn btn-primary">
              Save Character
            </button>
            <button onClick={exportToPDF} className="btn btn-success">
              Export PDF
            </button>
          </div>
        </header>

        <div className="main-content">
          {/* Basic Info */}
          <section className="section">
            <h2>Basic Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Character Name</label>
                <input
                  type="text"
                  value={character.name}
                  onChange={(e) =>
                    setCharacter({ ...character, name: e.target.value })
                  }
                  placeholder="Enter character name"
                />
              </div>
              <div className="form-group">
                <label>Species</label>
                <select
                  value={character.species}
                  onChange={(e) =>
                    setCharacter({ ...character, species: e.target.value })
                  }
                >
                  <option value="">Select Species</option>
                  <option value="Human">Human</option>
                  <option value="Elf">Elf</option>
                  <option value="Dwarf">Dwarf</option>
                  <option value="Halfling">Halfling</option>
                </select>
              </div>
              <div className="form-group">
                <label>Background</label>
                <select
                  value={character.background}
                  onChange={(e) =>
                    setCharacter({ ...character, background: e.target.value })
                  }
                >
                  <option value="">Select Background</option>
                  <option value="Soldier">Soldier</option>
                  <option value="Scholar">Scholar</option>
                  <option value="Rogue">Rogue</option>
                  <option value="Noble">Noble</option>
                </select>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="section">
            <h2>
              Main Stats{" "}
              <span className="points-remaining">
                (Points Remaining: {statPointsRemaining})
              </span>
            </h2>
            <div className="stats-grid">
              {Object.entries(character.stats).map(([stat, value]) => (
                <div key={stat} className="stat-item">
                  <label>{stat.charAt(0).toUpperCase() + stat.slice(1)}</label>
                  <div className="stat-controls">
                    <button onClick={() => handleStatChange(stat, value - 1)}>
                      -
                    </button>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => handleStatChange(stat, e.target.value)}
                      min="1"
                      max="10"
                    />
                    <button onClick={() => handleStatChange(stat, value + 1)}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Derived Stats */}
          <section className="section">
            <h2>Derived Stats</h2>
            <div className="derived-stats">
              <div className="derived-stat">
                <span className="label">Stamina:</span>
                <span className="value">{calculateStamina()}</span>
              </div>
              <div className="derived-stat">
                <span className="label">Initiative:</span>
                <span className="value">{calculateInitiative()}</span>
              </div>
              <div className="derived-stat">
                <span className="label">Speed:</span>
                <span className="value">{calculateSpeed()}</span>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="section">
            <h2>
              Skills{" "}
              <span className="points-remaining">
                (Points Remaining: {skillPointsRemaining})
              </span>
            </h2>
            <p className="section-note">Select up to 3 specializations</p>
            <div className="skills-grid">
              {skillsList?.map((skill) => (
                <div key={skill} className="skill-item">
                  <div className="skill-header">
                    <label>
                      {skill.charAt(0).toUpperCase() + skill.slice(1)}
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={character.specializations.includes(skill)}
                        onChange={() => toggleSpecialization(skill)}
                        disabled={
                          !character.specializations.includes(skill) &&
                          character.specializations.length >=
                            MAX_SPECIALIZATIONS
                        }
                      />
                      <span>Specialized</span>
                    </label>
                  </div>
                  <div className="skill-controls">
                    <button onClick={() => handleSkillChange(skill, -1)}>
                      -
                    </button>
                    <span className="skill-value">
                      {character.skills[skill]}
                    </span>
                    <button onClick={() => handleSkillChange(skill, 1)}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Trackers */}
          <section className="section">
            <h2>Trackers</h2>
            <div className="trackers-grid">
              <div className="tracker-item">
                <label>Action Points</label>
                <div className="tracker-dual">
                  <input
                    type="number"
                    value={character.trackers.currentAP}
                    onChange={(e) =>
                      handleTrackerChange("currentAP", e.target.value)
                    }
                    placeholder="Current"
                  />
                  <span>/</span>
                  <input
                    type="number"
                    value={character.trackers.maxAP}
                    onChange={(e) =>
                      handleTrackerChange("maxAP", e.target.value)
                    }
                    placeholder="Max"
                  />
                </div>
              </div>
              <div className="tracker-item">
                <label>Wounded Stage</label>
                <input
                  type="number"
                  value={character.trackers.woundedStage}
                  onChange={(e) =>
                    handleTrackerChange("woundedStage", e.target.value)
                  }
                />
              </div>
              <div className="tracker-item">
                <label>Armor</label>
                <input
                  type="number"
                  value={character.trackers.armor}
                  onChange={(e) => handleTrackerChange("armor", e.target.value)}
                />
              </div>
              <div className="tracker-item">
                <label>Tempo</label>
                <input
                  type="number"
                  value={character.trackers.tempo}
                  onChange={(e) => handleTrackerChange("tempo", e.target.value)}
                />
              </div>
              <div className="tracker-item">
                <label>Presence</label>
                <input
                  type="number"
                  value={character.trackers.presence}
                  onChange={(e) =>
                    handleTrackerChange("presence", e.target.value)
                  }
                />
              </div>
              <div className="tracker-item">
                <label>Fame/Infamy</label>
                <input
                  type="number"
                  value={character.trackers.fameInfamy}
                  onChange={(e) =>
                    handleTrackerChange("fameInfamy", e.target.value)
                  }
                />
              </div>
            </div>
          </section>

          {/* Text Sections */}
          <section className="section">
            <h2>Character Details</h2>
            <div className="text-sections">
              {Object.keys(character.textSections).map((section) => (
                <div key={section} className="text-section">
                  <label>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </label>
                  <textarea
                    value={character.textSections[section]}
                    onChange={(e) => handleTextChange(section, e.target.value)}
                    placeholder={`Enter ${section}...`}
                    rows="4"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Saved Characters */}
          {savedCharacters.length > 0 && (
            <section className="section">
              <h2>Saved Characters</h2>
              <div className="saved-characters">
                {savedCharacters.map((char) => (
                  <div key={char.id} className="saved-character-card">
                    <div className="saved-character-info">
                      <h3>{char.name || "Unnamed Character"}</h3>
                      <p>
                        {char.species} {char.background}
                      </p>
                      <small>
                        Saved: {new Date(char.savedAt).toLocaleDateString()}
                      </small>
                    </div>
                    <div className="saved-character-actions">
                      <button
                        onClick={() => loadCharacter(char.id)}
                        className="btn btn-sm btn-primary"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => deleteCharacter(char.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <PDFExporter
        character={character}
        calculateStamina={calculateStamina}
        calculateInitiative={calculateInitiative}
        calculateSpeed={calculateSpeed}
      />
    </>
  );
};

export default CharacterBuilder;
