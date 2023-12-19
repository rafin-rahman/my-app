"use client";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { editPdf } from "@/utils/editPdf";
import { validateAge, dateConvertUK } from "@/utils/formValidations";
import Image from "next/image";
import React from "react";
import { FormInputs as Inputs } from "@/utils/types";

export default function form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  // watch previousLoanSLC input
  const watchedPreviousLoanSLC = watch("previousLoanSLC");
  const watchedDateOfBirth = watch("dateOfBirth");
  const wantedRelationshipStatus = watch("relationshipStatus");
  const watchedIrishCitizen = watch("irishCitizen");
  const watchedFamilyMemberUkLiving3years = watch("familyMemberUkLiving3years");
  const watchedResidencyStatus = watch("residencyStatus");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Convert dateOfBirth to UK format before submitting
    if (data.dateOfBirth) {
      data.dateOfBirth = dateConvertUK(data.dateOfBirth);
    }
    if (data.marriageDate) {
      data.marriageDate = dateConvertUK(data.marriageDate);
    }

    editPdf(data);
  };

  // previousLoanSLC coordinates
  const no_previousLoanSLC = "332,722";
  const yes_previousLoanSLC = "286,722";
  // Relationship Status coordinates
  const marriageCivilPartnership = "285,143";
  // Irish Citizen coordinates
  const no_irishCitizen = "288,460";
  const yes_irishCitizen = "288,435";
  // Family member of UK living in UK for last 3 years coordinates
  const no_familyMemberUkLiving3years = "289,740";
  const yes_familyMemberUkLiving3years = "289,713";
  const settled_status = "290,455";

  const onError = (errors: FieldErrors<Inputs>) => console.error(errors);

  return (
    <>
      {/* Form to collect personal information */}
      <div className="dark:bg-gray-800 dark:text-white p-32">
        {/* add row */}
        <div className="flex flex-row mb-4">
          <div className="w-1/2">
            <h1 className="text-2xl font-bold mb-4 uppercase">
              Online Student Finance Form
            </h1>
          </div>
          <div className="w-1/2">
            {/* Image component to add a SFE logo*/}
            <Image
              className={"top-[70px] right-[100px] absolute"}
              src="/logos/sfe.png"
              alt="SFE Logo"
              width={200}
              height={200}
            />
          </div>
        </div>

        <p className="mb-6">PN1 2023/24</p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit, onError)}>
          {/* title select Mr, Mrs, Miss, Ms, Mx*/}
          <div className="flex flex-col">
            <label className="mb-1">Title</label>
            <select
              {...register("title")}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            >
              <option value={"300,735"}>Mr</option>
              <option value={"336,735"}>Mrs</option>
              <option value={"379,735"}>Miss</option>
              <option value={"429,735"}>Ms</option>
              <option value={"466,735"}>Mx</option>
            </select>
          </div>
          {/* first name */}
          <div className="flex flex-col">
            <p>{errors.firstName?.message}</p>
            <label className="mb-1">First Name</label>
            <input
              {...register("firstName")}
              type="text"
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            />
          </div>
          {/* last name */}
          <div className="flex flex-col">
            <p>{errors.lastName?.message}</p>
            <label className="mb-1">Last Name</label>
            <input
              {...register("lastName")}
              type="text"
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            />
          </div>
          {/*gender*/}
          <div className="flex flex-col">
            <p>{errors.gender?.message}</p>
            <label className="mb-1">Gender</label>
            <select
              {...register("gender")}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            >
              <option value={"300,627"}>Male</option>
              <option value={"350,627"}>Female</option>
            </select>
          </div>
          {/* Date of birth  */}
          <div className="flex flex-col">
            <p>{errors.dateOfBirth?.message}</p>
            <label className="mb-1">Date of Birth</label>
            <input
              {...register(
                "dateOfBirth"
                //     {
                //   validate: {
                //     ageRequirement: (value) =>
                //       validateAge(value) || "You must be aged between 18 and 70",
                //   },
                // }
              )}
              type="date"
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            />
          </div>
          {/* place of birth */}
          <div className="flex flex-col">
            <p>{errors.placeOfBirth?.message}</p>
            <label className="mb-1">Place of Birth</label>
            <input
              {...register("placeOfBirth")}
              type="text"
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            />
          </div>
          {/* nationality */}
          <div className="flex flex-col">
            <p>{errors.nationality?.message}</p>
            <label className="mb-1">Nationality</label>
            <input
              {...register("nationality")}
              type="text"
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            />
          </div>
          {/* National Insurance Number */}
          <div className="flex flex-col">
            <p>{errors.nationalInsuranceNumber?.message}</p>
            <label className="mb-1">National Insurance Number</label>
            <input
              {...register("nationalInsuranceNumber", {
                maxLength: {
                  value: 9,
                  message: "Must be 9 characters e.g. FG123456A",
                },
              })}
              type="text"
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            />
          </div>
          {/* hold uk passport - select */}
          <div className="flex flex-col">
            <p>{errors.holdUkPassport?.message}</p>
            <label className="mb-1">Do you hold a UK passport?</label>
            <select
              {...register("holdUkPassport")}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            >
              <option value={"342,390"}>No</option>
              <option value={"296,390"}>Yes</option>
            </select>
          </div>
          {/* previous SLC loan */}
          <div className="flex flex-col">
            <p>{errors.previousLoanSLC?.message}</p>
            <label className="mb-1">
              Have you had a previous student loan from Student Loans Company?
            </label>
            <select
              {...register("previousLoanSLC")}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            >
              <option value={no_previousLoanSLC}>No</option>
              <option value={yes_previousLoanSLC}>Yes</option>
            </select>
          </div>
          {/* if previous SLC loan is yes, then behind with repayments? */}
          {watchedPreviousLoanSLC === yes_previousLoanSLC && (
            <div className="flex flex-col">
              <p>{errors.behindWithRepayments?.message}</p>
              <label className="mb-1">
                Are you currently behind with repayments?
              </label>
              <select
                {...register("behindWithRepayments")}
                className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              >
                <option value={"332,682"}>No</option>
                <option value={"286,682"}>Yes</option>
              </select>
            </div>
          )}
          {/* armed forces member */}
          <div className="flex flex-col">
            <p>{errors.armedForcesMember?.message}</p>
            <label className="mb-1">
              Are you a member of the Armed Forces?
            </label>
            <select
              {...register("armedForcesMember")}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            >
              <option value={"332,617"}>No</option>
              <option value={"286,617"}>Yes</option>
            </select>
          </div>
          {/* family member of armed forces */}
          <div className="flex flex-col">
            <p>{errors.familyMemberArmedForces?.message}</p>
            <label className="mb-1">
              Are you a family member of a member of the Armed Forces?
            </label>
            <select
              {...register("familyMemberArmedForces")}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            >
              <option value={"332,577"}>No</option>
              <option value={"286,577"}>Yes</option>
            </select>
          </div>
          {/* Address */}
          <div className="flex flex-col">
            <p>{errors.address?.message}</p>
            <label className="mb-1">Full address</label>
            <textarea
              {...register("address")}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            />
          </div>
          {/* Postcode */}
          <div className="flex flex-col">
            <p>{errors.postcode?.message}</p>
            <label className="mb-1">Postcode</label>
            <input
              {...register("postcode")}
              type="text"
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            />
          </div>
          {/* Telephone Number */}
          <div className="flex flex-col">
            <p>{errors.telephoneNumber?.message}</p>
            <label className="mb-1">Telephone Number</label>
            <input
              {...register("telephoneNumber")}
              type="text"
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            />
          </div>
          {/* Email Address */}
          <div className="flex flex-col">
            <p>{errors.emailAddress?.message}</p>
            <label className="mb-1">Email Address</label>
            <input
              {...register("emailAddress")}
              type="text"
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            />
          </div>
          {/* Relationship Status */}
          <div className="flex flex-col">
            <p>{errors.relationshipStatus?.message}</p>
            <label className="mb-1">Relationship Status</label>
            <select
              {...register("relationshipStatus")}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            >
              <option value={"285,223"}>Single</option>
              <option value={"285,200"}>Living with a partner</option>
              <option value={marriageCivilPartnership}>
                Married/civil partnership
              </option>
              <option value={"285,84"}>Separated</option>
              <option value={"285,63"}>Divorced</option>
              <option value={"285,43"}>Widowed</option>
            </select>
          </div>
          {/* If relationship status is married/civil, marriage Date */}
          {wantedRelationshipStatus === marriageCivilPartnership && (
            <div className="flex flex-col">
              <p>{errors.marriageDate?.message}</p>
              <label className="mb-1">Marriage Date</label>
              <input
                {...register("marriageDate")}
                type="date"
                className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              />
            </div>
          )}
          {/* Are you a UK national? */}
          <div className="flex flex-col">
            <p>{errors.ukNational?.message}</p>
            <label className="mb-1">Are you a UK national?</label>
            <select
              {...register("ukNational")}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            >
              <option value={"288,543"}>No</option>
              <option value={"288,515"}>Yes</option>
            </select>
          </div>
          {/* Are you a Irish Citizen? */}
          <div className="flex flex-col">
            <p>{errors.irishCitizen?.message}</p>
            <label className="mb-1">Are you a Irish Citizen?</label>
            <select
              {...register("irishCitizen")}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            >
              <option value={no_irishCitizen}>No</option>
              <option value={yes_irishCitizen}>Yes</option>
            </select>
          </div>
          {/* If irishCitizen is yes, are you UK resident 3 years before first day of studies? */}
          {watchedIrishCitizen === yes_irishCitizen && (
            <div className="flex flex-col">
              <p>{errors.ukResident3YearsBeforeFirstDayOfStudies?.message}</p>
              <label className="mb-1">
                Are you a UK resident 3 years before first day of studies?
              </label>
              <select
                {...register("ukResident3YearsBeforeFirstDayOfStudies")}
                className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              >
                <option value={"350,365"}>No</option>
                <option value={"350,327"}>Yes</option>
              </select>
            </div>
          )}
          {/* Are you a family member of a UK national living in the UK for the last 3 years? */}
          <div className="flex flex-col">
            <p>{errors.familyMemberUkLiving3years?.message}</p>
            <label className="mb-1">
              Are you a family member of a UK national living in the UK for the
              last 3 years?
            </label>
            <select
              {...register("familyMemberUkLiving3years")}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            >
              <option value={no_familyMemberUkLiving3years}>No</option>
              <option value={yes_familyMemberUkLiving3years}>Yes</option>
            </select>
          </div>
          {/* Are you and your family member resident in the UK for the last 3 years prior first day of the academic year? */}
          {watchedFamilyMemberUkLiving3years ===
            yes_familyMemberUkLiving3years && (
            <div className="flex flex-col">
              <p>
                {errors.bothUkResident3YearsBeforeFirstDayOfStudies?.message}
              </p>
              <label className="mb-1">
                Are you and your family member resident in the UK or EEA for the
                last 3 years prior first day of the academic year?
              </label>
              <select
                {...register("bothUkResident3YearsBeforeFirstDayOfStudies")}
                className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              >
                <option value={"350,630"}>No</option>
                <option value={"350,595"}>Yes</option>
              </select>
            </div>
          )}

          {/* What is your residency status? */}
          <div className="flex flex-col">
            <p>{errors.residencyStatus?.message}</p>
            <label className="mb-1">What is your residency status?</label>
            <select
              {...register("residencyStatus")}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            >
              <option value={"290,348"}>Pre-settled</option>
              <option value={settled_status}>Settled</option>
            </select>
          </div>

          {watchedResidencyStatus === settled_status && (
            // If settled, then need to provide settled status share code
            <div className="flex flex-col">
              <p>{errors.settledStatusShareCode?.message}</p>
              <label className="mb-1">Settled Status Share Code</label>
              <input
                {...register("settledStatusShareCode")}
                type="text"
                className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              />
            </div>
          )}
          {/* Child of a swiss national */}
          <div className="flex flex-col">
            <p>{errors.childOfSwissNational?.message}</p>
            <label className="mb-1">Are you a child of a Swiss national?</label>
            <select
              {...register("childOfSwissNational")}
              className="p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50  dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            >
              <option value={"290,305"}>No</option>
            </select>
          </div>

          {/* Submit input with an on click and on hover animation*/}
          <input
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 w-full rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-600 transition duration-150 ease-in-out"
          />
        </form>

        {/*<a*/}
        {/*  // href={documentPath}*/}
        {/*  // download={suggestedFilename}*/}
        {/*  className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block hover:bg-blue-700"*/}
        {/*>*/}
        {/*  Download Document*/}
        {/*</a>*/}
      </div>
    </>
  );
}
