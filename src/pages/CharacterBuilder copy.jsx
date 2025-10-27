import React, { useState, useEffect } from "react";

const CharacterBuilder = () => {
  const [charName, setCharName] = useState("");
  const [species, setSpecies] = useState("");
  const [background, setBackground] = useState("");

  const [stats, setStats] = useState({
    strength: 3,
    endurance: 3,
    dexterity: 3,
    mind: 3,
    willpower: 3,
    spirit: 3,
  });

  const skillsList = [
    "Athletics",
    "Stealth",
    "Persuasion",
    "Investigation",
    "Arcana",
    "Medicine",
    "Survival",
    "Intimidation",
  ];

  const [skills, setSkills] = useState(
    skillsList.reduce((acc, skill) => ({ ...acc, [skill]: 2 }), {})
  );

  const [specializations, setSpecializations] = useState(new Set());
  const [statPointsRemaining, setStatPointsRemaining] = useState(20);
  const [skillPointsRemaining, setSkillPointsRemaining] = useState(15);

  const [trackers, setTrackers] = useState({
    apCurrent: 5,
    apMax: 5,
    wounded: 0,
    armor: 0,
    tempo: 0,
    presence: 0,
    fame: 0,
  });

  const [details, setDetails] = useState({
    perks: "",
    quirks: "",
    abilities: "",
    spells: "",
    weapons: "",
    gear: "",
    injuries: "",
    items: "",
    notes: "",
  });

  const [speed, setSpeed] = useState(6);

  const stamina = (stats.strength + stats.endurance) * 2;
  const initiative = Math.ceil(stats.dexterity / 2);

  useEffect(() => {
    switch (species) {
      case "human":
        setSpeed(6);
        break;
      case "elf":
        setSpeed(7);
        break;
      case "dwarf":
        setSpeed(5);
        break;
      case "orc":
        setSpeed(6);
        break;
      default:
        setSpeed(6);
    }
  }, [species]);

  const increaseStat = (stat) => {
    const cost = stats[stat];
    if (statPointsRemaining >= cost) {
      setStats({ ...stats, [stat]: stats[stat] + 1 });
      setStatPointsRemaining(statPointsRemaining - cost);
    }
  };

  const decreaseStat = (stat) => {
    if (stats[stat] > 0) {
      setStatPointsRemaining(statPointsRemaining + stats[stat] - 1);
      setStats({ ...stats, [stat]: stats[stat] - 1 });
    }
  };

  const increaseSkill = (skill) => {
    const cost = skills[skill];
    if (skillPointsRemaining >= cost) {
      setSkills({ ...skills, [skill]: skills[skill] + 1 });
      setSkillPointsRemaining(skillPointsRemaining - cost);
    }
  };

  const decreaseSkill = (skill) => {
    if (skills[skill] > 0) {
      setSkillPointsRemaining(skillPointsRemaining + skills[skill] - 1);
      setSkills({ ...skills, [skill]: skills[skill] - 1 });
    }
  };

  const toggleSpecialization = (skill) => {
    const newSpecs = new Set(specializations);
    if (newSpecs.has(skill)) {
      newSpecs.delete(skill);
    } else {
      if (newSpecs.size < 3) {
        newSpecs.add(skill);
      } else {
        alert("You can only specialize in 3 skills!");
        return;
      }
    }
    setSpecializations(newSpecs);
  };

  const saveCharacter = () => {
    const character = {
      name: charName,
      species,
      background,
      stats,
      skills,
      specializations: Array.from(specializations),
      trackers,
      details,
    };

    const chars = JSON.parse(localStorage.getItem("characters") || "[]");
    chars.push(character);
    localStorage.setItem("characters", JSON.stringify(chars));
    alert("Character saved successfully!");
  };

  const loadCharacter = () => {
    const chars = JSON.parse(localStorage.getItem("characters") || "[]");
    if (chars.length === 0) {
      alert("No saved characters found!");
      return;
    }

    const name = prompt("Enter character name to load:");
    const character = chars.find((c) => c.name === name);

    if (character) {
      setCharName(character.name);
      setSpecies(character.species);
      setBackground(character.background);
      setStats(character.stats);
      setSkills(character.skills);
      setSpecializations(new Set(character.specializations));
      setTrackers(character.trackers);
      setDetails(character.details);
      alert("Character loaded successfully!");
    } else {
      alert("Character not found!");
    }
  };

  const resetCharacter = () => {
    if (window.confirm("Are you sure you want to reset the character?")) {
      window.location.reload();
    }
  };

  const styles = {
    body: {
      fontFamily: '"Georgia", serif',
      background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
      color: "#e8e8e8",
      padding: "20px",
      minHeight: "100vh",
      //   width: "1000px",
      margin: 0,
    },
    container: {
      maxWidth: "1200px",
      //   width: "100%",
      margin: "0 auto",
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(10px)",
      borderRadius: "15px",
      padding: "30px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    },
    h1: {
      textAlign: "center",
      color: "#f0a500",
      fontSize: "2.3em",
      marginBottom: "0px",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    },
    subtitle: {
      textAlign: "center",
      color: "#aaa",
      marginBottom: "30px",
    },
    section: {
      background: "rgba(255, 255, 255, 0.03)",
      padding: "20px",
      marginBottom: "20px",
      borderRadius: "10px",
      border: "1px solid rgba(240, 165, 0, 0.2)",
    },
    sectionTitle: {
      color: "#f0a500",
      fontSize: "1.5em",
      marginBottom: "15px",
      borderBottom: "2px solid #f0a500",
      paddingBottom: "5px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "15px",
      marginBottom: "15px",
    },
    inputGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      color: "#f0a500",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "10px",
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(240, 165, 0, 0.3)",
      borderRadius: "5px",
      color: "#e8e8e8",
      fontFamily: "inherit",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(240, 165, 0, 0.3)",
      borderRadius: "5px",
      color: "#e8e8e8",
      fontFamily: "inherit",
      minHeight: "100px",
      resize: "vertical",
      boxSizing: "border-box",
    },
    statControl: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "rgba(0, 0, 0, 0.2)",
      padding: "10px",
      borderRadius: "5px",
      marginBottom: "10px",
    },
    statLabel: {
      flex: 1,
      margin: 0,
      color: "#f0a500",
      fontWeight: "bold",
    },
    statValue: {
      fontSize: "1.5em",
      fontWeight: "bold",
      color: "#f0a500",
      minWidth: "40px",
      textAlign: "center",
    },
    statCost: {
      fontSize: "0.9em",
      color: "#aaa",
    },
    button: {
      padding: "8px 15px",
      background: "#f0a500",
      border: "none",
      borderRadius: "5px",
      color: "#1a1a2e",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    pointsDisplay: {
      textAlign: "center",
      fontSize: "1.3em",
      padding: "15px",
      background: "rgba(240, 165, 0, 0.1)",
      borderRadius: "10px",
      marginBottom: "20px",
    },
    pointsRemaining: {
      color: "#f0a500",
      fontWeight: "bold",
      fontSize: "1.5em",
    },
    derivedStat: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      background: "rgba(0, 0, 0, 0.2)",
      borderRadius: "5px",
      marginBottom: "10px",
    },
    derivedStatValue: {
      color: "#f0a500",
      fontWeight: "bold",
      fontSize: "1.2em",
    },
    actionButtons: {
      display: "flex",
      gap: "10px",
      justifyContent: "center",
      flexWrap: "wrap",
      marginTop: "30px",
    },
    actionButton: {
      padding: "15px 30px",
      fontSize: "1.1em",
      background: "#f0a500",
      border: "none",
      borderRadius: "5px",
      color: "#1a1a2e",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s",
    },
    trackerGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "15px",
    },
    tracker: {
      background: "rgba(0, 0, 0, 0.2)",
      padding: "15px",
      borderRadius: "5px",
      textAlign: "center",
    },
    trackerInput: {
      width: "100%",
      textAlign: "center",
      fontSize: "1.2em",
      marginTop: "5px",
      padding: "10px",
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(240, 165, 0, 0.3)",
      borderRadius: "5px",
      color: "#e8e8e8",
      boxSizing: "border-box",
    },
    specializationCheck: {
      marginLeft: "10px",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.h1}>Will & Whispers</h1>
        <p style={styles.subtitle}>Character Builder</p>

        {/* Basic Info */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Basic Information</h2>
          <div style={styles.grid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Character Name</label>
              <input
                type="text"
                value={charName}
                onChange={(e) => setCharName(e.target.value)}
                placeholder="Enter name"
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Species</label>
              <select
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                style={styles.input}
              >
                <option value="">Select Species</option>
                <option value="human">Human (+1 to any stat, Speed 6)</option>
                <option value="elf">Elf (+2 Dexterity, Speed 7)</option>
                <option value="dwarf">Dwarf (+2 Endurance, Speed 5)</option>
                <option value="orc">Orc (+2 Strength, Speed 6)</option>
              </select>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Background</label>
              <select
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                style={styles.input}
              >
                <option value="">Select Background</option>
                <option value="warrior">
                  Warrior (+1 Strength, +1 Endurance)
                </option>
                <option value="scholar">Scholar (+2 Mind)</option>
                <option value="rogue">Rogue (+2 Dexterity)</option>
                <option value="mystic">Mystic (+1 Willpower, +1 Spirit)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Stats */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Main Stats</h2>
          <div style={styles.pointsDisplay}>
            Stat Points Remaining:{" "}
            <span style={styles.pointsRemaining}>{statPointsRemaining}</span>
          </div>
          <div>
            {Object.keys(stats).map((stat) => (
              <div key={stat} style={styles.statControl}>
                <label style={styles.statLabel}>
                  {stat.charAt(0).toUpperCase() + stat.slice(1)}
                </label>
                <button
                  onClick={() => decreaseStat(stat)}
                  style={styles.button}
                >
                  -
                </button>
                <span style={styles.statValue}>{stats[stat]}</span>
                <button
                  onClick={() => increaseStat(stat)}
                  style={styles.button}
                >
                  +
                </button>
                <span style={styles.statCost}>(Cost: {stats[stat]})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Derived Stats */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Derived Stats</h2>
          <div style={styles.derivedStat}>
            <span>Stamina (Health)</span>
            <span style={styles.derivedStatValue}>{stamina}</span>
          </div>
          <div style={styles.derivedStat}>
            <span>Initiative</span>
            <span style={styles.derivedStatValue}>{initiative}</span>
          </div>
          <div style={styles.derivedStat}>
            <span>Speed</span>
            <span style={styles.derivedStatValue}>{speed}</span>
          </div>
        </div>

        {/* Skills */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Skills</h2>
          <div style={styles.pointsDisplay}>
            Skill Points Remaining:{" "}
            <span style={styles.pointsRemaining}>{skillPointsRemaining}</span>
            <br />
            <small style={{ color: "#aaa" }}>
              Specializations Remaining: {3 - specializations.size}
            </small>
          </div>
          <div>
            {skillsList.map((skill) => (
              <div key={skill} style={styles.statControl}>
                <label style={styles.statLabel}>{skill}</label>
                <button
                  onClick={() => decreaseSkill(skill)}
                  style={styles.button}
                >
                  -
                </button>
                <span style={styles.statValue}>{skills[skill]}</span>
                <button
                  onClick={() => increaseSkill(skill)}
                  style={styles.button}
                >
                  +
                </button>
                <span style={styles.statCost}>(Cost: {skills[skill]})</span>
                <span style={styles.specializationCheck}>
                  <input
                    type="checkbox"
                    checked={specializations.has(skill)}
                    onChange={() => toggleSpecialization(skill)}
                  />
                  <label
                    style={{
                      display: "inline",
                      color: "#aaa",
                      fontWeight: "normal",
                    }}
                  >
                    Specialized
                  </label>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trackers */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Trackers</h2>
          <div style={styles.trackerGrid}>
            {Object.keys(trackers).map((key) => (
              <div key={key} style={styles.tracker}>
                <label style={styles.label}>
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </label>
                <input
                  type="number"
                  value={trackers[key]}
                  onChange={(e) =>
                    setTrackers({
                      ...trackers,
                      [key]: parseInt(e.target.value) || 0,
                    })
                  }
                  style={styles.trackerInput}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Character Details */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Character Details</h2>
          <div style={styles.grid}>
            {Object.keys(details)
              .filter((k) => k !== "notes")
              .map((key) => (
                <div key={key} style={styles.inputGroup}>
                  <label style={styles.label}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <textarea
                    value={details[key]}
                    onChange={(e) =>
                      setDetails({ ...details, [key]: e.target.value })
                    }
                    placeholder={`List your ${key} here...`}
                    style={styles.textarea}
                  />
                </div>
              ))}
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Notes</label>
            <textarea
              value={details.notes}
              onChange={(e) =>
                setDetails({ ...details, notes: e.target.value })
              }
              placeholder="Additional notes..."
              style={{ ...styles.textarea, minHeight: "150px" }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.actionButtons}>
          <button onClick={saveCharacter} style={styles.actionButton}>
            💾 Save Character
          </button>
          <button onClick={loadCharacter} style={styles.actionButton}>
            📂 Load Character
          </button>
          <button onClick={resetCharacter} style={styles.actionButton}>
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterBuilder;
