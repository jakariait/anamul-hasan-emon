import React, { useState, useEffect } from "react";
import {
  Save,
  Plus,
  Trash2,
  Edit3,
  User,
  BarChart3,
  Wrench,
  Workflow,
  ExternalLink,
} from "lucide-react";
import HeroImageUpload from "@/components/HeroImageUpload";
import WorkingProcessForm from "@/components/WorkingProcessForm";
import useAuthAdminStore from "@/store/AuthAdminStore";
import AdminPlansEditor from "@/components/AdminPlansEditor";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/pagecontent`;

const PageContentEditor = () => {
  const { token } = useAuthAdminStore();

  const [data, setData] = useState({
    name: "",
    title: "",
    heroContent: [""],
    socialLinks: {
      linkedin: "",
      facebook: "",
      youtube: "",
      tiktok: "",
      instagram: "",
    },
    stats: {
      happyClients: 0,
      projectCompleted: 0,
      yearsExperience: 0,
      adSpend: 0,
    },
    services: [{ title: "", description: "", iconName: "" }],
    toolsIUse: [{ title: "", iconName: "", items: [""] }],
    howIwork: [{ title: "", whatTheyWant: "", whatIDeliver: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("basic");

  // API endpoint

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE);
      if (response.ok) {
        const result = await response.json();
        // Handle your API response structure
        if (result.data) {
          setData(result.data);
        } else {
          setData(result);
        }
      }
    } catch (err) {
      setError("Failed to fetch data");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(API_BASE, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // <-- Add token here
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message || "Content saved successfully!");
        // Update data with the response if needed
        if (result.data) {
          setData(result.data);
        }
        setTimeout(() => setSuccess(""), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to save content");
      }
    } catch (err) {
      setError("Failed to save content");
      console.error("Save error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (path, value) => {
    setData((prev) => {
      const newData = { ...prev };
      const keys = path.split(".");
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addArrayItem = (path, defaultItem) => {
    setData((prev) => {
      const newData = { ...prev };
      const keys = path.split(".");
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = [
        ...current[keys[keys.length - 1]],
        defaultItem,
      ];
      return newData;
    });
  };

  const removeArrayItem = (path, index) => {
    setData((prev) => {
      const newData = { ...prev };
      const keys = path.split(".");
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter(
        (_, i) => i !== index,
      );
      return newData;
    });
  };

  const updateArrayItem = (path, index, value) => {
    setData((prev) => {
      const newData = { ...prev };
      const keys = path.split(".");
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]][index] = value;
      return newData;
    });
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: User },
    { id: "social", label: "Social Links", icon: ExternalLink },
    { id: "stats", label: "Statistics", icon: BarChart3 },
    { id: "services", label: "Services", icon: Wrench },
    { id: "tools", label: "Tools", icon: Edit3 },
    { id: "workflow", label: "How I Work", icon: Workflow },
  ];

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your professional title"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Hero Content
          </label>
          <button
            onClick={() => addArrayItem("heroContent", "")}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Line
          </button>
        </div>
        {data.heroContent.map((content, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={content}
              onChange={(e) =>
                updateArrayItem("heroContent", index, e.target.value)
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Hero content line"
            />
            {data.heroContent.length > 1 && (
              <button
                onClick={() => removeArrayItem("heroContent", index)}
                className="text-red-600 hover:text-red-800 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSocialLinks = () => (
    <div className="space-y-6">
      {Object.entries(data.socialLinks).map(([platform, url]) => (
        <div key={platform}>
          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
            {platform}
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) =>
              updateField(`socialLinks.${platform}`, e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Your ${platform} URL`}
          />
        </div>
      ))}
    </div>
  );

  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(data.stats).map(([key, value]) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {key
              .replace(/([A-Z])/g, " $1")
              .toLowerCase()
              .replace(/^./, (str) => str.toUpperCase())}
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) =>
              updateField(`stats.${key}`, parseInt(e.target.value) || 0)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>
      ))}
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Services</h3>
        <button
          onClick={() =>
            addArrayItem("services", {
              title: "",
              description: "",
              iconName: "",
            })
          }
          className="flex cursor-pointer items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Service
        </button>
      </div>

      {data.services.map((service, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Service {index + 1}</h4>
            {data.services.length > 1 && (
              <button
                onClick={() => removeArrayItem("services", index)}
                className="text-red-600 cursor-pointer hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={service.title}
                onChange={(e) => {
                  const newServices = [...data.services];
                  newServices[index].title = e.target.value;
                  updateField("services", newServices);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon Name
              </label>
              <input
                type="text"
                value={service.iconName}
                onChange={(e) => {
                  const newServices = [...data.services];
                  newServices[index].iconName = e.target.value;
                  updateField("services", newServices);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={service.description}
              onChange={(e) => {
                const newServices = [...data.services];
                newServices[index].description = e.target.value;
                updateField("services", newServices);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderTools = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Tools I Use</h3>
        <button
          onClick={() =>
            addArrayItem("toolsIUse", { title: "", iconName: "", items: [""] })
          }
          className="flex items-center cursor-pointer px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Tool Category
        </button>
      </div>

      {data.toolsIUse.map((tool, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Tool Category {index + 1}</h4>
            {data.toolsIUse.length > 1 && (
              <button
                onClick={() => removeArrayItem("toolsIUse", index)}
                className="text-red-600 cursor-pointer hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category Title
              </label>
              <input
                type="text"
                value={tool.title}
                onChange={(e) => {
                  const newTools = [...data.toolsIUse];
                  newTools[index].title = e.target.value;
                  updateField("toolsIUse", newTools);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon Name
              </label>
              <input
                type="text"
                value={tool.iconName}
                onChange={(e) => {
                  const newTools = [...data.toolsIUse];
                  newTools[index].iconName = e.target.value;
                  updateField("toolsIUse", newTools);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Tools
              </label>
              <button
                onClick={() => {
                  const newTools = [...data.toolsIUse];
                  newTools[index].items.push("");
                  updateField("toolsIUse", newTools);
                }}
                className="text-sm cursor-pointer text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-4 h-4 inline mr-1" />
                Add Tool
              </button>
            </div>

            {tool.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newTools = [...data.toolsIUse];
                    newTools[index].items[itemIndex] = e.target.value;
                    updateField("toolsIUse", newTools);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tool name"
                />
                {tool.items.length > 1 && (
                  <button
                    onClick={() => {
                      const newTools = [...data.toolsIUse];
                      newTools[index].items = newTools[index].items.filter(
                        (_, i) => i !== itemIndex,
                      );
                      updateField("toolsIUse", newTools);
                    }}
                    className="text-red-600 cursor-pointer hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderWorkflow = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">How I Work</h3>
        <button
          onClick={() =>
            addArrayItem("howIwork", {
              title: "",
              whatTheyWant: "",
              whatIDeliver: "",
            })
          }
          className="flex items-center cursor-pointer px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Content
        </button>
      </div>

      {data.howIwork.map((step, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Content {index + 1}</h4>
            {data.howIwork.length > 1 && (
              <button
                onClick={() => removeArrayItem("howIwork", index)}
                className="text-red-600 cursor-pointer hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={step.title}
                onChange={(e) => {
                  const newSteps = [...data.howIwork];
                  newSteps[index].title = e.target.value;
                  updateField("howIwork", newSteps);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What They Want
              </label>
              <textarea
                value={step.whatTheyWant}
                onChange={(e) => {
                  const newSteps = [...data.howIwork];
                  newSteps[index].whatTheyWant = e.target.value;
                  updateField("howIwork", newSteps);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What I Deliver
              </label>
              <textarea
                value={step.whatIDeliver}
                onChange={(e) => {
                  const newSteps = [...data.howIwork];
                  newSteps[index].whatIDeliver = e.target.value;
                  updateField("howIwork", newSteps);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "basic":
        return renderBasicInfo();
      case "social":
        return renderSocialLinks();
      case "stats":
        return renderStats();
      case "services":
        return renderServices();
      case "tools":
        return renderTools();
      case "workflow":
        return renderWorkflow();
      default:
        return renderBasicInfo();
    }
  };

  if (loading && !data.name) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">
              Page Content Editor
            </h1>
            <p className="text-blue-100 mt-2">
              Manage your website content with ease
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 m-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 m-6">
              <p className="text-green-700">{success}</p>
            </div>
          )}

          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r border-gray-200">
              <nav className="p-4 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full cursor-pointer flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              <div className="max-w-4xl">
                {renderContent()}

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={saveData}
                    disabled={loading}
                    className="flex items-center cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HeroImageUpload />
      <WorkingProcessForm />
      <AdminPlansEditor />
    </div>
  );
};

export default PageContentEditor;
