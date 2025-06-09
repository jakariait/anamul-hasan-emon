"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthAdminStore from "@/store/AuthAdminStore";
import { Plus, X, Save, Trash2, Star, Loader2 } from "lucide-react";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/pagecontent`;

const emptyPlan = {
  title: "",
  price: "",
  isHighlighted: false,
  highlights: [""],
};

const AdminPlansEditor = () => {
  const { token } = useAuthAdminStore();

  const [plans, setPlans] = useState({ monthly: [], project: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPlans = async () => {
    try {
      const res = await axios.get(API_BASE);
      setPlans(res.data.plans || { monthly: [], project: [] });
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch plans", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handlePlanChange = (type, index, field, value) => {
    const updated = { ...plans };
    updated[type][index][field] = value;
    setPlans(updated);
  };

  const handleHighlightChange = (type, index, value) => {
    const updated = { ...plans };
    updated[type][index].isHighlighted = value;
    setPlans(updated);
  };

  const handleHighlightItemChange = (type, index, i, value) => {
    const updated = { ...plans };
    updated[type][index].highlights[i] = value;
    setPlans(updated);
  };

  const addHighlightItem = (type, index) => {
    const updated = { ...plans };
    updated[type][index].highlights.push("");
    setPlans(updated);
  };

  const removeHighlightItem = (type, index, i) => {
    const updated = { ...plans };
    updated[type][index].highlights.splice(i, 1);
    setPlans(updated);
  };

  const addNewPlan = (type) => {
    const updated = { ...plans };
    updated[type].push({ ...emptyPlan });
    setPlans(updated);
  };

  const removePlan = (type, index) => {
    const updated = { ...plans };
    updated[type].splice(index, 1);
    setPlans(updated);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await axios.put(
        API_BASE,
        { plans },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // <-- Add token here
          },
        },
      );
      alert("Plans updated successfully!");
    } catch (error) {
      console.error("Failed to save plans", error);
      alert("Error saving plans.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="relative">
            <Loader2 className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-orange-200 rounded-full mx-auto animate-pulse"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium">Loading plans...</p>
          <p className="text-gray-400 text-sm mt-1">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                Manage Plans
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Configure your pricing plans and manage subscription features with ease
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleSave}
                disabled={saving}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Save All Plans
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Plans Sections */}
        <div className="space-y-8">
          {["monthly", "project"].map((type) => (
            <div key={type} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 px-8 py-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      {type === 'monthly' ? '📅' : '🎯'}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white capitalize">
                        {type} Plans
                      </h2>
                      <p className="text-gray-300 text-sm mt-1">
                        Manage your {type} subscription options
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => addNewPlan(type)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20"
                  >
                    <Plus className="w-4 h-4" />
                    Add {type} Plan
                  </button>
                </div>
              </div>

              {/* Plans Content */}
              <div className="p-8">
                {plans[type].length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-4xl">📋</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No {type} plans yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Get started by creating your first {type} plan
                    </p>
                    <button
                      onClick={() => addNewPlan(type)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-medium rounded-xl hover:bg-orange-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Create First Plan
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {plans[type].map((plan, index) => (
                      <div
                        key={index}
                        className={`relative rounded-xl border-2 p-6 transition-all duration-200 ${
                          plan.isHighlighted
                            ? 'border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100 shadow-lg ring-4 ring-orange-100'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                        }`}
                      >
                        {/* Popular Badge */}
                        {plan.isHighlighted && (
                          <div className="absolute -top-4 -right-4 flex items-center gap-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                            <Star className="w-4 h-4 fill-current" />
                            Most Popular
                          </div>
                        )}

                        {/* Form Fields */}
                        <div className="space-y-6">
                          {/* Title and Price */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">
                                Plan Title
                              </label>
                              <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-gray-400"
                                placeholder="Enter plan title"
                                value={plan.title}
                                onChange={(e) =>
                                  handlePlanChange(type, index, "title", e.target.value)
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">
                                Price
                              </label>
                              <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-gray-400"
                                placeholder="$0.00"
                                value={plan.price}
                                onChange={(e) =>
                                  handlePlanChange(type, index, "price", e.target.value)
                                }
                              />
                            </div>
                          </div>

                          {/* Highlight Toggle */}
                          <div className="flex items-center">
                            <label className="flex items-center gap-3 cursor-pointer group">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={plan.isHighlighted}
                                  onChange={(e) =>
                                    handleHighlightChange(type, index, e.target.checked)
                                  }
                                  className="w-5 h-5 text-orange-600 border-2 border-gray-300 rounded focus:ring-orange-500 transition-all"
                                />
                              </div>
                              <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                                Mark as featured plan
                              </span>
                            </label>
                          </div>

                          {/* Features */}
                          <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700">
                              Plan Features
                            </label>
                            <div className="space-y-3">
                              {plan.highlights.map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                  <input
                                    type="text"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-gray-400"
                                    placeholder="Enter feature description"
                                    value={item}
                                    onChange={(e) =>
                                      handleHighlightItemChange(
                                        type,
                                        index,
                                        i,
                                        e.target.value,
                                      )
                                    }
                                  />
                                  <button
                                    onClick={() => removeHighlightItem(type, index, i)}
                                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all border border-red-200 hover:border-red-300"
                                    title="Remove feature"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                              <button
                                onClick={() => addHighlightItem(type, index)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-xl transition-all border-2 border-dashed border-orange-300 hover:border-orange-400"
                              >
                                <Plus className="w-4 h-4" />
                                Add New Feature
                              </button>
                            </div>
                          </div>

                          {/* Delete Plan */}
                          <div className="flex justify-end pt-4 border-t border-gray-200">
                            <button
                              onClick={() => removePlan(type, index)}
                              className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all border border-red-200 hover:border-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete Plan
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPlansEditor;